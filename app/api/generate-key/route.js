import { db } from "../lib/firebaseAdmin.js";

function generateKey() {
  return "sk-" + Math.random().toString(36).substring(2, 15);
}

export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET allowed" });
  }

  const newKey = generateKey();

  await db.collection("users").add({
    apiKey: newKey,
    requests: 0,
    createdAt: new Date()
  });

  return res.json({
    apiKey: newKey
  });
}
