import React, { useState } from "react";

export default function BrowserHistorySimulator() {
  const [urlInput, setUrlInput] = useState("");
  const [history, setHistory] = useState([]);

  // Normalize the URL (trim + lowercase)
  const normalizeUrl = (url) => url.trim().toLowerCase();

  // Visit URL and add to history with timestamp
  const visitUrl = () => {
    const url = normalizeUrl(urlInput);
    if (!url) return;

    const timestamp = new Date().toLocaleString();

    setHistory((prevHistory) => {
      // Remove duplicate (case-insensitive match)
      const filtered = prevHistory.filter((entry) => entry.url !== url);
      return [{ url, timestamp }, ...filtered];
    });

    setUrlInput("");
  };

  // Pressing Enter triggers visit
  const handleKeyDown = (e) => {
    if (e.key === "Enter") visitUrl();
  };

  // Clear history
  const clearHistory = () => setHistory([]);

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h2>🧭 Browser History Simulator</h2>

      <input
        type="text"
        placeholder="Enter URL (e.g. https://example.com)"
        value={urlInput}
        onChange={(e) => setUrlInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          padding: "0.6rem",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={visitUrl}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginRight: "0.5rem",
          }}
          disabled={!urlInput.trim()}
        >
          Visit
        </button>

        <button
          onClick={clearHistory}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
          disabled={history.length === 0}
        >
          Clear History
        </button>
      </div>

      <h3 style={{ marginTop: "2rem" }}>🕓 Recently Visited URLs</h3>
      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ol style={{ paddingLeft: "1.5rem" }}>
          {history.map((entry, index) => (
            <li key={index} style={{ marginBottom: "0.75rem" }}>
              <strong>{entry.url}</strong>
              <br />
              <small>Visited at: {entry.timestamp}</small>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
