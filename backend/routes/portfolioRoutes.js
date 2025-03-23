const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// ✅ Create Portfolio Entry
router.post("/", async (req, res) => {
  const { userId, title, description, link } = req.body;
  try {
    const newPortfolio = await pool.query(
      "INSERT INTO portfolios (user_id, title, description, link) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, description, link]
    );
    res.status(201).json(newPortfolio.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Portfolio by User ID
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const portfolio = await pool.query("SELECT * FROM portfolios WHERE user_id = $1", [userId]);
    res.json(portfolio.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Portfolio Entry
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, link } = req.body;
  try {
    const updatedPortfolio = await pool.query(
      "UPDATE portfolios SET title = $1, description = $2, link = $3 WHERE id = $4 RETURNING *",
      [title, description, link, id]
    );
    res.json(updatedPortfolio.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Portfolio Entry
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM portfolios WHERE id = $1", [id]);
    res.json({ message: "Portfolio entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

