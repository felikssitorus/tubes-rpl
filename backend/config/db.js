const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tubes_rpl",
  password: "i22083",
  port: 5432
});

module.exports = pool;
