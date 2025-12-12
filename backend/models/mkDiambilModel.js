const pool = require("../config/db");

// Ambil daftar mata kuliah yang diambil mahasiswa berdasarkan email user
const getMkDiambilByEmail = async (email) => {
  const query = `
    SELECT m.nama AS nama_mahasiswa, mk.nama_mata_kuliah, mkd.semester, mkd.tahun, mkd.kelas
    FROM users u
    JOIN mahasiswa m ON u.email = m.email
    JOIN mengambil amb ON amb.npm = m.npm
    JOIN mata_kuliah_dibuka mkd ON mkd.id_mk_dibuka = amb.id_mk_dibuka
    JOIN mata_kuliah mk ON mk.id_mata_kuliah = mkd.id_mata_kuliah
    WHERE u.email = $1
    ORDER BY mkd.tahun DESC, mkd.semester DESC;
  `;

  const result = await pool.query(query, [email]);
  return result.rows;
};

module.exports = { getMkDiambilByEmail };
