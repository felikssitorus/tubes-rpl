const pool = require("../config/db");

// Nilai lengkap mahasiswa
const getNilaiByNpm = async (npm) => {
  const query = `
    SELECT komponen.nama_komponen, komponen.bobot_komponen,
           nilai.nilai
    FROM nilai
    JOIN komponen ON komponen.id_komponen = nilai.id_komponen
    WHERE nilai.npm = $1
    ORDER BY komponen.id_komponen;
  `;
  const result = await pool.query(query, [npm]);
  return result.rows;
};

// Daftar tubes mahasiswa (optional filter idMk)
const getTubesWithNilai = async (npm, idMk) => {
  let query = `
    SELECT DISTINCT t.id_tubes, t.topik_tubes
    FROM tugas_besar t
    JOIN kelompok k ON k.id_tubes = t.id_tubes
    JOIN anggota_kelompok ak ON ak.id_kelompok = k.id_kelompok
    WHERE ak.npm = $1
  `;
  const params = [npm];

  if (idMk) {
    query += ` AND t.id_mk_dibuka = $2`;
    params.push(idMk);
  }

  query += ` ORDER BY t.id_tubes`;

  const result = await pool.query(query, params);
  return result.rows;
};

// Nilai per komponen per tubes
const getNilaiByNpmAndTubes = async (npm, idTubes) => {
  const query = `
    SELECT c.nama_komponen, n.nilai
    FROM komponen c
    LEFT JOIN nilai n ON n.id_komponen = c.id_komponen AND n.npm = $2
    WHERE c.id_tubes = $1
    ORDER BY c.id_komponen;
  `;
  const result = await pool.query(query, [idTubes, npm]);
  return result.rows;
};

module.exports = {
  getNilaiByNpm,
  getTubesWithNilai,
  getNilaiByNpmAndTubes
};
