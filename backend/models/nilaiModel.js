const pool = require("../config/db");

// EXISTING FUNCTION (biarkan aja)
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

// ================================================
// 1️⃣ GET daftar tubes yang punya nilai
// ================================================
const getTubesWithNilai = async (npm) => {
  const q = `
    SELECT DISTINCT t.id_tubes, t.topik_tubes
    FROM tugas_besar t
    JOIN komponen c ON t.id_tubes = c.id_tubes
    JOIN nilai n ON n.id_komponen = c.id_komponen
    WHERE n.npm = $1
    ORDER BY t.id_tubes
  `;
  const rows = await pool.query(q, [npm]);
  return rows.rows;
};

// ================================================
// 2️⃣ GET nilai per tubes (komponen)
// ================================================
const getNilaiByNpmAndTubes = async (npm, idTubes) => {
  const q = `
    SELECT c.nama_komponen, n.nilai
    FROM komponen c
    LEFT JOIN nilai n ON n.id_komponen = c.id_komponen
    WHERE c.id_tubes = $1 AND n.npm = $2
    ORDER BY c.id_komponen
  `;
  const rows = await pool.query(q, [idTubes, npm]);
  return rows.rows;
};

module.exports = { 
  getNilaiByNpm,
  getTubesWithNilai,
  getNilaiByNpmAndTubes
};
