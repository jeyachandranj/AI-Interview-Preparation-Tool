import os
from flask import Flask, request, jsonify, render_template, Response
from flask_cors import CORS
from pypdf import PdfReader
import json
from resumeparsermain import parserfn
import sys
from detection import detect_objects, gen_frames, detected_object

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

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/object_detected')
def object_detected():
    return jsonify({"detected": detected_object})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
