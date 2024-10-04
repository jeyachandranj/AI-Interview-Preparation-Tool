import os
import sys
from flask import Flask, request, jsonify
from pypdf import PdfReader
import cv2
import torch
from flask import Flask, render_template, Response, jsonify
import json
from resumeparsermain import parserfn
from flask_cors import CORS

# Add YOLOv5 path
sys.path.insert(0, './yolov5')  # Update with the correct path to YOLOv5

# YOLOv5 imports
from models.common import DetectMultiBackend
from utils.torch_utils import select_device

UPLOAD_DIR = os.path.join(os.getcwd(), 'upload')

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def ats():
    doc = request.files['pdf_doc']
    file_path = os.path.join(UPLOAD_DIR, doc.filename)

    doc.save(file_path)

    data = _read_file_from_path(file_path)
    
    data = parserfn(data)
    print("Parsed data:", data)  
    try:
        json_data = json.loads(data)
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return jsonify({"error": "Failed to parse JSON data"}), 400
    
    return jsonify(json_data)

def _read_file_from_path(path):
    reader = PdfReader(path)
    data = ""
    for page_no in range(len(reader.pages)):
        page = reader.pages[page_no]
        data += page.extract_text()
    return data

# Initialize YOLOv5
device = select_device()  # Automatically select device (CPU or GPU)
model = DetectMultiBackend('yolov5s.pt', device=device)

TARGET_CLASSES = ['book', 'cell phone', 'laptop']

def detect_objects(frame):
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = model(rgb_frame)

    object_detected = False  
    for detection in results.xyxy[0]: 
        x1, y1, x2, y2, confidence, class_id = detection[:6]
        class_name = model.names[int(class_id)]
        if class_name in TARGET_CLASSES:
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(frame, f'{class_name} {confidence:.2f}', (int(x1), int(y1) - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)
            object_detected = True  

    return frame, object_detected


def gen_frames():
    cap = cv2.VideoCapture(0)  
    while True:
        success, frame = cap.read()
        if not success:
            break
        else:
            frame, _ = detect_objects(frame)  # Perform object detection on each frame
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/')
def index():
    return render_template('index.html')


# Route for video feed streaming
@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


# API route to detect objects and return JSON response
@app.route('/detect_objects')
def detect_objects_api():
    cap = cv2.VideoCapture(0)
    success, frame = cap.read()

    if success:
        _, object_detected = detect_objects(frame)  # Detect objects in the frame
        return jsonify({'detected': object_detected})
    else:
        return jsonify({'detected': False})

if __name__ == "__main__":
    app.run(port=8000, debug=True)
