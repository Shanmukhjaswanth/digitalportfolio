const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

// 📌 User Signup (Registration)
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // ✅ Validate input fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields (name, email, password) are required" });
  }

  try {
    // ✅ Check if user already exists
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered. Please log in." });
    }

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert new user
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    console.log("New User Registered:", newUser.rows[0]); // Debugging
    res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });

  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 User Login (Authentication)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // ✅ Validate input fields
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // ✅ Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      console.log("Login Attempt: User not found", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Verify password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      console.log("Login Attempt: Incorrect password", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { userId: user.rows[0].id, name: user.rows[0].name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

 
