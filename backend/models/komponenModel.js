const pool = require("../config/db");

const getAll = async () => {
  const result = await pool.query("SELECT * FROM komponen ORDER BY id_komponen ASC");
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query("SELECT * FROM komponen WHERE id_komponen = $1", [id]);
  return result.rows[0];
};

const getTotalBobot = async (id_tubes) => {
  const result = await pool.query(
    "SELECT COALESCE(SUM(bobot_komponen), 0) as total FROM komponen WHERE id_tubes = $1",
    [id_tubes]
  );
  return parseFloat(result.rows[0].total);
};

const create = async (data) => {
  if (!data.id_tubes || !data.nama_komponen || !data.bobot_komponen) {
    throw new Error("Missing required fields");
  }
  
  const result = await pool.query(
    "INSERT INTO komponen (id_tubes, nama_komponen, bobot_komponen, catatan) VALUES ($1, $2, $3, $4) RETURNING *",
    [data.id_tubes, data.nama_komponen, data.bobot_komponen, data.catatan || null]
  );
  
  return result.rows[0];
};

const update = async (id_komponen, data) => {
  const result = await pool.query(
    "UPDATE komponen SET nama_komponen=$1, bobot_komponen=$2, catatan=$3, id_tubes=$4 WHERE id_komponen=$5 RETURNING *",
    [data.nama_komponen, data.bobot_komponen, data.catatan || null, data.id_tubes, id_komponen]
  );
  
  return result.rows[0];
};

const remove = async (id_komponen) => {
  const result = await pool.query("DELETE FROM komponen WHERE id_komponen = $1 RETURNING *", [id_komponen]);
  return result.rowCount > 0;
};

module.exports = { getAll, getById, getTotalBobot, create, update, remove };