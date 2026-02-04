const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// middleware
app.use(express.json());

// ✅ MongoDB CONNECT (यो line missing थियो)
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error ❌", err));

// schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// test route
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express API 🚀" });
});

// ✅ ADD DATA (POST)
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET DATA
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// another route
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
