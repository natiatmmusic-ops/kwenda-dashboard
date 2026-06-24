"use client";

import { useState } from "react";

export default function ImportPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;

    setStatus("uploading");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/import-shopify", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setResult(data);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "60px auto", padding: "0 20px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Import Shopify Orders</h1>
      <p style={{ color: "#666", marginBottom: 24, fontSize: 14 }}>
        Upload the CSV file you exported from Shopify (Orders → Export).
        Orders already in the database will be skipped automatically.
      </p>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ marginBottom: 16, display: "block" }}
        />
        <button
          type="submit"
          disabled={!file || status === "uploading"}
          style={{
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: 14,
            cursor: "pointer",
            opacity: !file || status === "uploading" ? 0.5 : 1,
          }}
        >
          {status === "uploading" ? "Importing..." : "Import Orders"}
        </button>
      </form>

      {status === "done" && result && (
        <div style={{ marginTop: 24, fontSize: 14 }}>
          <p>✅ Import complete.</p>
          <p>Total rows read: {result.totalRows}</p>
          <p>New orders added: {result.inserted}</p>
          <p>Already existed (skipped): {result.skipped}</p>
        </div>
      )}

      {status === "error" && (
        <p style={{ marginTop: 24, color: "red", fontSize: 14 }}>❌ {errorMsg}</p>
      )}
    </div>
  );
}
