// 🔹 1. Imports
console.log("🔥 THIS FILE IS RUNNING");
const express = require("express");
const { Pool } = require("pg");

// 🔹 2. App create
const app = express();

// 🔹 3. Middleware
app.use(express.json());

// 🔹 4. DB connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ghostops",
  password: "Mehak@123",
  port: 5432,
});

// 🔹 5. DB test
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("DB Error:", err);
  } else {
    console.log("DB Connected:", res.rows[0]);
  }
});

// 🔹 6. Test route
app.get("/", (req, res) => {
  res.send("GhostOps running 🚀");
});

// 🔹 7. POST /logs (save log to DB)
app.post("/logs", async (req, res) => {
  const { level, message, service } = req.body;

  // basic validation
  if (!level || !message || !service) {
    return res.status(400).json({
      error: "All fields (level, message, service) are required",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO logs (level, message, service) VALUES ($1, $2, $3) RETURNING *",
      [level, message, service]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Insert Error:", err);
    res.status(500).json({
      success: false,
      error: "Error saving log",
    });
  }
});

// 🔹 8. GET /logs (fetch all logs)
app.get("/logs", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM logs ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({
      success: false,
      error: "Error fetching logs",
    });
  }
});

// 🔹 9. Server start
app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});
app.post("/logs", (req, res) => {
  res.send("POST WORKING ✅");
});



app.get("/logs", async (req, res) => {
  const { level } = req.query;

  try {
    let query = "SELECT * FROM logs";
    let values = [];

    if (level) {
      query += " WHERE level = $1";
      values.push(level);
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching logs");
  }
});