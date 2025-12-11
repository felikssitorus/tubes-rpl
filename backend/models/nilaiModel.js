const pool = require("../config/db");

const getNilaiByNpm = async (npm) => {
  const query = `
    SELECT komponen.nama_komponen, komponen.bobot_komponen,
           nilai.nilai, nilai.catatan, nilai.jadwal
    FROM nilai
    JOIN komponen ON komponen.id_komponen = nilai.id_komponen
    WHERE nilai.npm = $1
    ORDER BY komponen.id_komponen;
  `;
  const result = await pool.query(query, [npm]);
  return result.rows;
};

module.exports = { getNilaiByNpm };
