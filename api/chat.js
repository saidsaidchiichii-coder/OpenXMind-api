<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Get Your Free API Key</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin-top: 50px;
    }
    button {
      background-color: #4CAF50;
      color: white;
      padding: 14px 20px;
      margin: 10px;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #45a049;
    }
    .output {
      margin-top: 20px;
      font-size: 18px;
      color: #333;
    }
  </style>
</head>
<body>

  <h1>Get Your Free API Key</h1>
  <button id="getKeyButton">Get Free API Key</button>

  <div class="output" id="apiKeyOutput"></div>

  <script>
    // Event listener for the button click
    document.getElementById('getKeyButton').addEventListener('click', async () => {
      const response = await fetch('/api/generate-key', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        document.getElementById('apiKeyOutput').textContent = 'Your API Key: ' + data.apiKey;
      } else {
        document.getElementById('apiKeyOutput').textContent = 'Error: ' + response.statusText;
      }
    });
  </script>

</body>
</html>
