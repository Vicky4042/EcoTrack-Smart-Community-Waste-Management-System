import { useRef, useState } from "react";

function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  // Start camera
  const startCamera = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true
    });
    videoRef.current.srcObject = mediaStream;
    setStream(mediaStream);
  };

  // Capture image
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");
    onCapture(image);

    // Stop camera
    stream.getTracks().forEach((track) => track.stop());
  };

  return (
    <div>
      <button type="button" className="btn" onClick={startCamera}>
  Open Camera
</button>

      <br /><br />

      <video ref={videoRef} autoPlay width="100%" />

      <br /><br />

    <button type="button" className="btn" onClick={captureImage}>
  Capture
</button>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default CameraCapture;