import { useEffect, useState } from "react";

export default function Home() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetch("https://YOUR-BACKEND-URL.onrender.com/trends")
      .then(res => res.json())
      .then(data => setTrends(data.trends));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🇮🇳 AI Video Generator</h1>

      <h2>Trending Topics</h2>
      <ul>
        {trends.map((t, i) => (
          <li key={i}>{t.topic}</li>
        ))}
      </ul>

      <button
        onClick={async () => {
          const res = await fetch(
            "https://ai-video-backend-w6ho.onrender.com",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                platform: "Instagram Reels",
                language: "Hindi"
              })
            }
          );
          alert(JSON.stringify(await res.json(), null, 2));
        }}
      >
        Generate Video
      </button>
    </div>
  );
}
