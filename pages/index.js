import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch(
        "https://ai-video-backend-w6ho.onrender.com/generate-video",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            platform: "Instagram Reels",
            language: "Hindi",
          }),
        }
      );

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setResult("❌ Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>🇮🇳 AI Video Generator</h1>

      <button
        onClick={generateVideo}
        style={{ padding: 10, marginTop: 20 }}
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>

      {result && (
        <pre
          style={{
            marginTop: 20,
            background: "#f4f4f4",
            padding: 15,
            whiteSpace: "pre-wrap",
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}
