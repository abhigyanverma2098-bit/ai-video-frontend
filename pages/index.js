import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>🇮🇳 AI Video Generator</h1>

      <button
        onClick={() => setMessage("Generate Video button works ✅")}
        style={{ padding: 10, marginTop: 20 }}
      >
        Generate Video
      </button>

      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  );
}
