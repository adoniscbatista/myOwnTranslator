const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "src/client/index.html")
});

app.post("/translate", async (req, res) => {
  const { q, target, format, api_key } = req.body;
  try {
    const response = await axios.post("https://libretranslate.com/translate", {
      q,
      source: "auto",
      target,
      format,
      api_key,
    });

    const translatedText = response.data.translatedText;
    res.json({ translation: translatedText });
  } catch (error) {
    console.error("Error translating:", error);
    res.status(500).json({ error: "An error occurred while translating." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})