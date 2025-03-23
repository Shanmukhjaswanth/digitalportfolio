const pool = require("../config/db");  // Import PostgreSQL connection

// Function to create users table
const createUserTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);
    console.log("✅ Users table created or already exists");
  } catch (error) {
    console.error("❌ Error creating users table:", error);
  }
};

// Call the function to create table
createUserTable();

module.exports = pool;

