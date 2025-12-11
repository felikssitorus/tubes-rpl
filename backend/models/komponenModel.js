const pool = require("../config/db");

// GET all komponen
const getAll = async () => {
  const result = await pool.query("SELECT * FROM komponen ORDER BY id_komponen ASC");
  return result.rows;
};

// GET komponen by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM komponen WHERE id_komponen = $1", [id]);
  return result.rows[0];
};

// CREATE komponen
const create = async (data) => {
  const maxIdQuery = await pool.query("SELECT MAX(id_komponen) as max_id FROM komponen");
  const nextId = (maxIdQuery.rows[0].max_id || 0) + 1;
  const result = await pool.query(
    "INSERT INTO komponen (id_komponen, nama_komponen, bobot_komponen, catatan, id_tubes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [nextId, data.nama_komponen, data.bobot_komponen, data.catatan, data.id_tubes]
  );
  return result.rows[0];
};

// UPDATE komponen
const update = async (id_komponen, data) => {
  const result = await pool.query(
    "UPDATE komponen SET nama_komponen=$1, bobot_komponen=$2, catatan=$3, id_tubes=$4 WHERE id_komponen=$5 RETURNING *",
    [data.nama_komponen, data.bobot_komponen, data.catatan, data.id_tubes, id_komponen]
  );
  return result.rows[0];
};

// DELETE komponen
const remove = async (id_komponen) => {
  await pool.query("DELETE FROM komponen WHERE id_komponen = $1", [id_komponen]);
  return true;
};

module.exports = { getAll, getById, create, update, remove };