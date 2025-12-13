const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "TubesRPL",
  password: "yos123",
  port: 5432
});

module.exports = pool;
