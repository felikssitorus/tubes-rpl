const pool = require("../config/db");

// Ambil user berdasarkan email
const getByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

// Ambil semua user (untuk testing/debug)
const getAll = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};
module.exports = { getByEmail, getAll };