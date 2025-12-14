const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tubes_rpl",
  password: "password123",
  port: 5432
});

module.exports = pool;
