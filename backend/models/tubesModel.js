const pool = require("../config/db");

// Ambil semua tugas besar (tubes) berdasarkan email mahasiswa
const getTubesByEmail = async (email) => {
  const query = `
    SELECT t.id_tubes, t.topik_tubes, mkd.id_mk_dibuka, mkd.kelas, mk.nama_mata_kuliah, mkd.semester, mkd.tahun
    FROM users u
    JOIN mahasiswa m ON u.email = m.email
    JOIN mengambil amb ON amb.npm = m.npm
    JOIN mata_kuliah_dibuka mkd ON mkd.id_mk_dibuka = amb.id_mk_dibuka
    JOIN mata_kuliah mk ON mk.id_mata_kuliah = mkd.id_mata_kuliah
    JOIN tugas_besar t ON t.id_mk_dibuka = mkd.id_mk_dibuka
    WHERE u.email = $1
    ORDER BY mkd.tahun DESC, mkd.semester DESC, mkd.kelas ASC;
  `;
  const { rows } = await pool.query(query, [email]);
  return rows;
};

module.exports = { getTubesByEmail };
