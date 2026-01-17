import React, { useState } from "react";

export default function App() {
  const [status, setStatus] = useState("Awake");

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Driver Safety Monitoring Dashboard</h1>
      <div style={{ padding: 30, fontFamily: "Arial" }}>
  <h1>Driver Safety Monitoring Dashboard</h1>

  <p style={{ color: "gray" }}>
    Simulated real-time drowsiness detection dashboard
  </p>

  {/* rest of your code */}
</div>

      <div style={{ marginTop: 20 }}>
        <p><b>Driver Status:</b> {status}</p>
        <p><b>Eye Status:</b> {status === "Awake" ? "Open" : "Closed"}</p>
        <p><b>System:</b> Running</p>
      </div>

      {status === "Drowsy" && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#ffe6e6",
            color: "#b30000",
            fontWeight: "bold",
          }}
        >
          ⚠️ ALERT: Driver appears drowsy!
        </div>
      )}

      <div style={{ marginTop: 30 }}>
        <button onClick={() => setStatus("Awake")}>Set Awake</button>
        <button
          onClick={() => setStatus("Drowsy")}
          style={{ marginLeft: 10 }}
        >
          Set Drowsy
        </button>
      </div>
    </div>
  );
}
