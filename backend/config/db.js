const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,    // Your PostgreSQL username
  host: process.env.DB_HOST,    // Usually 'localhost'
  database: process.env.DB_NAME, // Your database name
  password: process.env.DB_PASSWORD, // Your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;

