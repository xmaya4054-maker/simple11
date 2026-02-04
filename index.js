const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express API 🚀" });
});

// another route
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
