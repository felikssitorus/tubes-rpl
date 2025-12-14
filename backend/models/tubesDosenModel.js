const pool = require("../config/db");

const getAll = async (id_mk_dibuka = null) => {
  let query = `
    SELECT  tb.id_tubes, tb.topik_tubes, tb.id_mk_dibuka, tb.is_locked, mk.nama_mata_kuliah, mk.id_mata_kuliah,
      mkd.semester, mkd.tahun, mkd.kelas
    FROM tugas_besar tb
    INNER JOIN mata_kuliah_dibuka mkd ON tb.id_mk_dibuka = mkd.id_mk_dibuka
    INNER JOIN mata_kuliah mk ON mkd.id_mata_kuliah = mk.id_mata_kuliah
  `;
  
  const params = [];
  
  if (id_mk_dibuka) {
    query += " WHERE tb.id_mk_dibuka = $1";
    params.push(id_mk_dibuka);
  }
  
  query += " ORDER BY tb.id_tubes ASC";
  
  const result = await pool.query(query, params);
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(`
    SELECT tb.id_tubes, tb.topik_tubes, tb.id_mk_dibuka, tb.is_locked, mk.nama_mata_kuliah, mk.id_mata_kuliah,
      mkd.semester, mkd.tahun, mkd.kelas
    FROM tugas_besar tb
    INNER JOIN mata_kuliah_dibuka mkd ON tb.id_mk_dibuka = mkd.id_mk_dibuka
    INNER JOIN mata_kuliah mk ON mkd.id_mata_kuliah = mk.id_mata_kuliah
    WHERE tb.id_tubes = $1
  `, [id]);
  return result.rows[0];
};

const create = async (data) => {
  const result = await pool.query(
    "INSERT INTO tugas_besar (id_mk_dibuka, topik_tubes, is_locked) VALUES ($1, $2, $3) RETURNING *",
    [data.id_mk_dibuka, data.topik_tubes, false]
  );
  return result.rows[0];
};

const update = async (id_tubes, data) => {
  const result = await pool.query(
    "UPDATE tugas_besar SET topik_tubes=$1, is_locked=$2 WHERE id_tubes=$3 RETURNING *",
    [data.topik_tubes, data.is_locked, id_tubes]
  );
  return result.rows[0];
};

const remove = async (id_tubes) => {
  const result = await pool.query("DELETE FROM tugas_besar WHERE id_tubes = $1 RETURNING *", [id_tubes]);
  return result.rowCount > 0;
};

module.exports = { getAll, getById, create, update, remove };