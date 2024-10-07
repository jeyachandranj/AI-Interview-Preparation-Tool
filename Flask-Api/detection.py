import os
import cv2
import torch
from flask import Flask, render_template, Response, jsonify

model = torch.hub.load('ultralytics/yolov5', 'yolov5s')  

TARGET_CLASSES = ['book', 'cell phone', 'laptop']
detected_object = None  

def detect_objects(frame):
    """Detect objects in the given video frame."""
    global detected_object
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) 
    results = model(rgb_frame)  
    
    detected_object = None  
    for detection in results.xyxy[0]: 
        x1, y1, x2, y2, confidence, class_id = detection[:6]
        class_name = model.names[int(class_id)]  
        print(f"Detected: {class_name} with confidence {confidence:.2f}")
        
        if class_name.lower() in [target.lower() for target in TARGET_CLASSES]:
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(frame, f'{class_name} {confidence:.2f}', (int(x1), int(y1) - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)
            detected_object = class_name  
    
    return frame

def gen_frames():
    """Generate video frames with object detection."""
    cap = cv2.VideoCapture(0)  
    while True:
        success, frame = cap.read()  # Read frame from webcam
        if not success:
            break
        else:
            frame = detect_objects(frame)  # Perform object detection on the frame
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
