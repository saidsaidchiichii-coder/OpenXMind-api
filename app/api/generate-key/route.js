export async function POST() {
  try {
    const apiKey =
      "api_" + Math.random().toString(36).substring(2, 15);

    return Response.json({ apiKey });
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
