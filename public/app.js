async function generateKey() {
  const res = await fetch("/api/generate-key", {
    method: "POST"
  });

  const data = await res.json();

  document.getElementById("result").innerText =
    "Your API Key: " + data.apiKey;
}
