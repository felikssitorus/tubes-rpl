const pool = require("../config/db");

// GET all employees
const getAll = async () => {
  const result = await pool.query("SELECT * FROM employees ORDER BY id DESC");
  return result.rows;
};

// GET employee by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);
  return result.rows[0];
};

// CREATE employee
const create = async (data) => {
  const result = await pool.query(
    "INSERT INTO employees (name, position, salary) VALUES ($1, $2, $3) RETURNING *",
    [data.name, data.position, data.salary]
  );
  return result.rows[0];
};

// UPDATE employee
const update = async (id, data) => {
  const result = await pool.query(
    "UPDATE employees SET name=$1, position=$2, salary=$3 WHERE id=$4 RETURNING *",
    [data.name, data.position, data.salary, id]
  );
  return result.rows[0];
};

// DELETE employee
const remove = async (id) => {
  await pool.query("DELETE FROM employees WHERE id = $1", [id]);
  return true;
};

module.exports = { getAll, getById, create, update, remove };
