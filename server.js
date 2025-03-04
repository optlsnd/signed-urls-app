// server.js
const express = require("express");
const path = require("path");
const EdgeAuth = require("akamai-edgeauth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const UC_SIGNING_SECRET = process.env.UC_SIGNING_SECRET;
const UC_HOSTNAME = "sectest.ucarecdn.com";

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route to serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/sign", (req, res) => {
  const { path, lifetime } = req.query;

  if (!path || !lifetime) {
    return res
      .status(400)
      .send(
        "<code>path</code> and <code>lifetime</code> query parameters are required"
      );
  }

  const signer = new EdgeAuth({
    key: UC_SIGNING_SECRET,
    windowSeconds: lifetime,
    escapeEarly: true,
    tokenName: "token",
  });

  const token = signer.generateURLToken(path);
  const signedURL = `https://${UC_HOSTNAME}${path}?${signer.options.tokenName}=${token}`;

  console.log(signedURL);

  return res.json({ signedURL });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
