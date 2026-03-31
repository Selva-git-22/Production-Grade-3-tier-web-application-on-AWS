const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// =====================
// CRASH DEBUG (IMPORTANT)
// =====================
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("💥 Unhandled Rejection:", err);
});

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());

// =====================
// DATABASE CONNECTION (FIXED)
// =====================
const db = mysql.createPool({
  host: "database-1.cvoqim28aind.ap-south-2.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  database: "ecomdb",
  waitForConnections: true,
  connectionLimit: 10,
});

// Test DB connection safely
db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to RDS");
    conn.release();
  }
});

// =====================
// LOGIN API
// =====================
app.get("/api/users", (req, res) => {
  const { email, password } = req.query;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// =====================
// SIGNUP API
// =====================
app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "User created successfully",
      userId: result.insertId,
    });
  });
});

// =====================
// PRODUCTS API
// =====================
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// =====================
// CART API (ADD THIS)
// =====================
app.get("/api/cart", (req, res) => {
  const sql = "SELECT * FROM cart";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// =====================
// TEST API
// =====================
app.get('/users', (req, res) => {
  const email = req.query.email;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(result);
    }
  );
});
