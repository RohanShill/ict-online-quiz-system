const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/submit", (req, res) => {
  console.log("DATA RECEIVED:", req.body);

  let results = [];

  if (fs.existsSync("result.json")) {
    const data = fs.readFileSync("result.json");
    results = JSON.parse(data);
  }

  results.push(req.body);

  fs.writeFileSync("result.json", JSON.stringify(results, null, 2));

  res.json({ message: "Result saved successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});