require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const snippetRoutes = require("./routes/snippet");

const app = express();

// -----------------------------
// 🔥 CORS FIX (IMPORTANT FOR RENDER)
// -----------------------------
app.use(cors({
  origin: "*",           // allow all for now
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// -----------------------------
// Middlewares
// -----------------------------
app.use(express.json());

// -----------------------------
// Routes
// -----------------------------
app.use("/api/auth", authRoutes);
app.use("/api/snippets", snippetRoutes);

// -----------------------------
// Start Server
// -----------------------------
const PORT = process.env.PORT || 5000;

// -----------------------------
// Connect DB THEN start server
// -----------------------------
connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {       // <-- IMPORTANT FOR RENDER
    console.log(`🔥 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.log("❌ Failed to start server:", err);
});
