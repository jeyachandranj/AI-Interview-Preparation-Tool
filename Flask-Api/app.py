import os
from flask import Flask, request, jsonify, render_template, Response
from flask_cors import CORS
from pypdf import PdfReader
import json
from resumeparsermain import parserfn
import sys
import cv2
import torch

sys.path.insert(0, os.path.abspath(os.getcwd()))

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

#Object Detection Code


model = torch.hub.load('ultralytics/yolov5', 'yolov5s')  

TARGET_CLASSES = ['book','cell phone', 'laptop']

detected_object = None  

def detect_objects(frame):
    global detected_object
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = model(rgb_frame)
    
    for detection in results.xyxy[0]: 
        x1, y1, x2, y2, confidence, class_id = detection[:6]
        class_name = model.names[int(class_id)]
        print(f"Detected: {class_name} with confidence {confidence:.2f}")
        
        if class_name.lower() in [target.lower() for target in TARGET_CLASSES]:
            if confidence >= 0.70:
                detected_object = {
                    "class_name": class_name,
                    "confidence": float(confidence)
                }
                cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
                cv2.putText(frame, f'{class_name} {confidence:.2f}', (int(x1), int(y1) - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)
    return frame

def gen_frames():
    cap = cv2.VideoCapture(0) 
    while True:
        success, frame = cap.read() 
        if not success:
            break
        else:
            frame = detect_objects(frame)  
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return render_template('index.html') 

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/object_detected')
def object_detected():
    if detected_object:
        return jsonify(detected_object)
    else:
        return jsonify({"detected": None})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
