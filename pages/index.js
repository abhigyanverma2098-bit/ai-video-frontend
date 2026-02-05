import { useState, useEffect } from "react";

export default function Home() {
  const [trends, setTrends] = useState([]);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    fetch("https://ai-video-backend-w6ho.onrender.com")
      .then((res) => res.json())
      .then((data) => setTrends(data.trends))
      .catch((err) => console.error(err));
  }, []);

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
      alert("Backend error");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🇮🇳 AI Video Generator</h1>

      <h2>Trending Topics</h2>
      <ul>
        {trends.map((t, i) => (
          <li key={i}>{t.topic}</li>
        ))}
      </ul>

      <button
        onClick={generateVideo}
        style={{ padding: 10, marginTop: 10 }}
      >
        Generate Video
      </button>

      {videoData && (
        <div style={{ marginTop: 20 }}>
          <h3>{videoData.title}</h3>
          <p>{videoData.script}</p>
          <p>{videoData.hashtags.join(" ")}</p>
          <p>Best time: {videoData.postingTime}</p>
        </div>
      )}
    </div>
  );
}
