const express = require("express");
const cors = require("cors"); // If you're using frontend requests
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  console.log("🔍 Checking database connection...");
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Database connected at:", res.rows[0].now);
  }
});

// Basic route to test server
app.get("/", (req, res) => {
  res.send("✅ Express server is running!");
});

// Routes (make sure authRoutes.js and portfolioRoutes.js exist)
app.use("/api/auth", require("./routes/authRoutes")); 
app.use("/api/portfolio", require("./routes/portfolioRoutes")); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


