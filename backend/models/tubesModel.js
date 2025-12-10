const pool = require("../config/db");

// GET all tugas besar
const getAll = async () => {
  const result = await pool.query(`
    SELECT 
      tb.*,
      mk.nama_mata_kuliah,
      mkd.semester,
      mkd.tahun,
      mkd.kelas
    FROM tugas_besar tb
    JOIN mata_kuliah_dibuka mkd ON tb.id_mk_dibuka = mkd.id_mk_dibuka
    JOIN mata_kuliah mk ON mkd.id_mata_kuliah = mk.id_mata_kuliah
    ORDER BY tb.id_tubes ASC
  `);
  return result.rows;
};

// GET tugas besar by ID
const getById = async (id) => {
  const result = await pool.query(`
    SELECT 
      tb.*,
      mk.nama_mata_kuliah,
      mkd.semester,
      mkd.tahun,
      mkd.kelas
    FROM tugas_besar tb
    JOIN mata_kuliah_dibuka mkd ON tb.id_mk_dibuka = mkd.id_mk_dibuka
    JOIN mata_kuliah mk ON mkd.id_mata_kuliah = mk.id_mata_kuliah
    WHERE tb.id_tubes = $1
  `, [id]);
  return result.rows[0];
};

// GET tugas besar by id_mk_dibuka
const getByMataKuliahDibuka = async (id_mk_dibuka) => {
  const result = await pool.query(`
    SELECT *
    FROM tugas_besar
    WHERE id_mk_dibuka = $1
    ORDER BY id_tubes ASC
  `, [id_mk_dibuka]);
  return result.rows;
};

// CREATE tugas besar
const create = async (data) => {
  const result = await pool.query(
    "INSERT INTO tugas_besar (id_mk_dibuka, topik_tubes) VALUES ($1, $2) RETURNING *",
    [data.id_mk_dibuka, data.topik_tubes]
  );
  return result.rows[0];
};

// UPDATE tugas besar
const update = async (id_tubes, data) => {
  const result = await pool.query(
    "UPDATE tugas_besar SET id_mk_dibuka=$1, topik_tubes=$2 WHERE id_tubes=$3 RETURNING *",
    [data.id_mk_dibuka, data.topik_tubes, id_tubes]
  );
  return result.rows[0];
};

// DELETE tugas besar
const remove = async (id_tubes) => {
  await pool.query("DELETE FROM tugas_besar WHERE id_tubes = $1", [id_tubes]);
  return true;
};

module.exports = { getAll, getById, getByMataKuliahDibuka, create, update, remove };const pool = require("../config/db");

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
