"use client"; // Required in Next.js 13+ if using client-side code

import { useState, useEffect } from "react";

export default function Home() {
  const [trends, setTrends] = useState([]);
  const [videoData, setVideoData] = useState(null);

  // Fetch trending topics from backend
  useEffect(() => {
    fetch("https://ai-video-backend-w6ho.onrender.com")
      .then((res) => res.json())
      .then((data) => setTrends(data.trends))
      .catch((err) => console.error("Error fetching trends:", err));
  }, []);

  // Handle generate video button
  const generateVideo = async () => {
    try {
      const res = await fetch(
        "https://ai-video-backend.onrender.com/generate-video",
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
      setVideoData(data);
    } catch (err) {
      console.error("Error generating video:", err);
      alert("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🇮🇳 AI Video Generator</h1>

      <h2>Trending Topics</h2>
      {trends.length === 0 ? (
        <p>Loading trends...</p>
      ) : (
        <ul>
          {trends.map((t, i) => (
            <li key={i}>
              <strong>{t.topic}</strong> | Hashtags: {t.hashtags.join(", ")}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={generateVideo}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Generate Video
      </button>

      {videoData && (
        <div style={{ marginTop: 20, background: "#f0f0f0", padding: 10 }}>
          <h3>Generated Video Metadata:</h3>
          <p>
            <strong>Title:</strong> {videoData.title}
          </p>
          <p>
            <strong>Script:</strong> {videoData.script}
          </p>
          <p>
            <strong>Hashtags:</strong> {videoData.hashtags.join(", ")}
          </p>
          <p>
            <strong>Suggested Posting Time:</strong> {videoData.postingTime}
          </p>
        </div>
      )}
    </div>
  );
}
