import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const WebcamPage = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoChunks, setVideoChunks] = useState([]);

  useEffect(() => {
    const startRecording = async () => {
      const mediaStream = webcamRef.current.stream;
      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        setVideoChunks((prev) => [...prev, event.data]);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(videoChunks, { type: "video/webm" });
        await saveVideo(blob);
      };

      mediaRecorder.start();
      setRecording(true);

      // Stop recording after 30 minutes (1800000 milliseconds)
      setTimeout(() => {
        stopRecording(); // Stop recording after 30 minutes
      }, 1800000);
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setRecording(false);
      }
    };

    startRecording();

    return () => {
      stopRecording(); // Cleanup function to stop recording on component unmount
    };
  }, [videoChunks]);

  const saveVideo = async (blob) => {
    const fileHandle = await window.showDirectoryPicker();
    const videoFolder = await fileHandle.getDirectoryHandle("videos", { create: true });
    const file = await videoFolder.getFileHandle("recorded-video.webm", { create: true });
    const writable = await file.createWritable();
    await writable.write(blob);
    await writable.close();
    console.log("Video saved locally to the selected path");
  };

  return (
    <div>
      <h2>Webcam Recording Page</h2>
      <Webcam
        audio={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ display: recording ? "block" : "none", marginTop: "20px" }}
      />
      {recording && <p>Recording... (will stop after 30 minutes)</p>}
      {!recording && <p>Recording stopped.</p>}
    </div>
  );
};

export default WebcamPage;
