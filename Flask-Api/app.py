import os
import sys
from flask import Flask, request, jsonify
from pypdf import PdfReader
import json
from resumeparsermain import parserfn
from flask_cors import CORS
import cv2
import torch

sys.path.insert(0, os.path.abspath(os.getcwd()))

UPLOAD_DIR = os.path.join(os.getcwd(), 'upload')

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

app = Flask(__name__)

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



model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

classes_of_interest = {'cell phone': 67, 'laptop': 63, 'book': 39}
detected_objects = []
detected_last_time = False 
def detect_objects():
    global detected_last_time
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        results = model(frame)
        detections = results.pred[0]

        detected = False
        for *box, conf, cls in detections:
            class_id = int(cls.item())
            if class_id in classes_of_interest.values():
                detected = True
                break

        if detected and not detected_last_time:
            detected_objects.append("Target object detected!")
            detected_last_time = True  
        elif not detected:
            detected_last_time = False  

        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    cap.release()

@app.route('/video_feed')
def video_feed():
    return Response(detect_objects(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/alerts', methods=['GET'])
def alerts():
    if detected_objects:
        return {"alert": detected_objects.pop(0)}, 200
    return {"alert": None}, 204

if __name__ == "__main__":
    app.run(port=8000, debug=True)