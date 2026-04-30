import { db } from "../lib/firebaseAdmin.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "API key required" });
  }

  // 🔍 check API key in Firebase
  const snapshot = await db
    .collection("users")
    .where("apiKey", "==", apiKey)
    .get();

  if (snapshot.empty) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  const message = req.body?.message;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  // 🤖 Groq API
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: message }]
      })
    }
  );

  const data = await response.json();

  return res.json({
    reply: data.choices?.[0]?.message?.content || "No response"
  });
}
