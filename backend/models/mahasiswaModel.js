const pool = require("../config/db");

// Ambil mahasiswa berdasarkan email
const getByEmail = async (email) => {
  const result = await pool.query(
    "SELECT npm, nama, email, kelas FROM mahasiswa WHERE email = $1",
    [email]
  );
  return result.rows[0]; // return undefined kalau tidak ditemukan
};

// Ambil semua mahasiswa (untuk testing)
const getAll = async () => {
  const result = await pool.query("SELECT * FROM mahasiswa");
  return result.rows;
};

module.exports = { getByEmail, getAll };

