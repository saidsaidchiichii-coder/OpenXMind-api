import { db } from "../lib/firebaseAdmin";

function randomKey() {
  return "api_" + Math.random().toString(36).substring(2, 15);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const apiKey = randomKey();

    await db.collection("users").add({
      apiKey,
      createdAt: Date.now(),
      requests: 0
    });

    return res.json({ apiKey });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
