import { db } from "@/lib/firebaseAdmin";

function randomKey() {
  return "api_" + Math.random().toString(36).substring(2, 15);
}

export async function POST() {
  try {
    const apiKey = randomKey();

    await db.collection("users").add({
      apiKey,
      createdAt: Date.now(),
      requests: 0
    });

    return Response.json({ apiKey });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
