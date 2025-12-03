const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tubes_rpl",
  password: "Bgavsm23",
  port: 5432
});

module.exports = pool;
