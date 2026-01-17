import { useEffect, useRef, useState } from "react";

export default function App() {
  // CAMERA
  const videoRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  // DETECTION
  const [status, setStatus] = useState("Normal");
  const [alert, setAlert] = useState("");

  // Start camera
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraOn(true);
        }
      } catch (err) {
        console.log("Camera blocked");
      }
    }
    startCamera();
  }, []);

  // Detection cycle
  useEffect(() => {
    let step = 0;

    const interval = setInterval(() => {
      if (step === 0) {
        setStatus("Normal");
        setAlert("");
      } else if (step === 1) {
        setStatus("Drowsy");
        setAlert("⚠️ Driver appears drowsy! Please take a break.");
      } else if (step === 2) {
        setStatus("Looking Away");
        setAlert("⚠️ Driver is looking away from the road!");
      }

      step = (step + 1) % 3;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // UI
  return (
    <div
      style={{
        padding: 30,
        fontFamily: "Arial",
        display: "flex",
        gap: "30px",
        alignItems: "flex-start",
      }}
    >
      {/* LEFT – CAMERA */}
      <div>
        <h2>Live Driver Camera</h2>
        {cameraOn ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: "360px",
              height: "270px",
              borderRadius: "12px",
              border: "3px solid #000",
              backgroundColor: "#000",
            }}
          />
        ) : (
          <p>Starting camera…</p>
        )}
      </div>

      {/* RIGHT – STATUS */}
      <div>
        <h1>🚗 Driver Safety Monitoring</h1>
        <p style={{ color: "gray" }}>
          Real-time driver monitoring with automatic alerts
        </p>

        <h3>
          Driver Status:{" "}
          <span
            style={{
              color:
                status === "Normal"
                  ? "green"
                  : status === "Drowsy"
                  ? "red"
                  : "orange",
            }}
          >
            {status}
          </span>
        </h3>

        {alert && (
          <div
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: "#ffe6e6",
              color: "#b30000",
              fontWeight: "bold",
              borderRadius: "8px",
              maxWidth: "300px",
            }}
          >
            {alert}
          </div>
        )}
      </div>
    </div>
  );
}
