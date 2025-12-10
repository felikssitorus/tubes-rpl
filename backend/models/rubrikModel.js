const pool = require("../config/db");

// GET all rubrik
const getAll = async () => {
  const result = await pool.query("SELECT * FROM rubrik ORDER BY id_rubrik ASC");
  return result.rows;
};

// GET rubrik by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM rubrik WHERE id_rubrik = $1", [id]);
  return result.rows[0];
};

// CREATE rubrik
const create = async (data) => {
  const result = await pool.query(
    "INSERT INTO rubrik (komponen_penilaian, catatan, persentase) VALUES ($1, $2, $3) RETURNING *",
    [data.komponen_penilaian, data.catatan, data.persentase]
  );
  return result.rows[0];
};

// UPDATE rubrik
const update = async (id_rubrik, data) => {
  const result = await pool.query(
    "UPDATE rubrik SET komponen_penilaian=$1, catatan=$2, persentase=$3 WHERE id_rubrik=$4 RETURNING *",
    [data.komponen_penilaian, data.catatan, data.persentase, id_rubrik]
  );
  return result.rows[0];
};

// DELETE rubrik
const remove = async (id_rubrik) => {
  await pool.query("DELETE FROM rubrik WHERE id_rubrik = $1", [id_rubrik]);
  return true;
};

module.exports = { getAll, getById, create, update, remove };