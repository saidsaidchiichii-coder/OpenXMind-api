export async function POST() {
  const apiKey =
    "api_" + Math.random().toString(36).substring(2, 15);

  return Response.json({ apiKey });
}
