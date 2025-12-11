const pool = require("../config/db");

// GET all mata kuliah yang dibuka (berdasarkan dosen yang login)
// Untuk sekarang ambil semua mata_kuliah_dibuka dulu
const getAll = async () => {
  const result = await pool.query(`
    SELECT DISTINCT 
      mk.id_mata_kuliah,
      mk.nama_mata_kuliah,
      mkd.id_mk_dibuka,
      mkd.semester,
      mkd.tahun,
      mkd.kelas
    FROM mata_kuliah mk
    INNER JOIN mata_kuliah_dibuka mkd ON mk.id_mata_kuliah = mkd.id_mata_kuliah
    ORDER BY mk.id_mata_kuliah ASC
  `);
  return result.rows;
};

// GET mata kuliah yang diajar oleh dosen tertentu
const getByDosen = async (nik) => {
  const result = await pool.query(`
    SELECT DISTINCT 
      mk.id_mata_kuliah,
      mk.nama_mata_kuliah,
      mkd.id_mk_dibuka,
      mkd.semester,
      mkd.tahun,
      mkd.kelas
    FROM mata_kuliah mk
    INNER JOIN mata_kuliah_dibuka mkd ON mk.id_mata_kuliah = mkd.id_mata_kuliah
    INNER JOIN mengajar m ON mkd.id_mk_dibuka = m.id_mk_dibuka
    WHERE m.nik = $1
    ORDER BY mk.id_mata_kuliah ASC
  `, [nik]);
  return result.rows;
};

// GET mata kuliah by ID
const getById = async (id) => {
  const result = await pool.query(`
    SELECT 
      mk.id_mata_kuliah,
      mk.nama_mata_kuliah,
      mkd.id_mk_dibuka,
      mkd.semester,
      mkd.tahun,
      mkd.kelas
    FROM mata_kuliah mk
    INNER JOIN mata_kuliah_dibuka mkd ON mk.id_mata_kuliah = mkd.id_mata_kuliah
    WHERE mkd.id_mk_dibuka = $1
  `, [id]);
  return result.rows[0];
};

module.exports = { getAll, getByDosen, getById };