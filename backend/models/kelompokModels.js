const pool = require("../config/db");

const getKelompokByTubesDB = async (idTubes) => {
  const query = `
    SELECT k.id_kelompok, k.nama_kelompok, m.nama
    FROM kelompok k
    LEFT JOIN anggota_kelompok ak ON k.id_kelompok = ak.id_kelompok
    LEFT JOIN mahasiswa m ON ak.npm = m.npm
    WHERE k.id_tubes = $1
    ORDER BY k.id_kelompok, m.nama
  `;
  const { rows } = await pool.query(query, [idTubes]);
  return rows;
};

const getKelompokMahasiswaDB = async (idTubes, npm) => {
  const query = `
    SELECT k.id_kelompok, k.nama_kelompok
    FROM anggota_kelompok ak
    JOIN kelompok k ON ak.id_kelompok = k.id_kelompok
    WHERE ak.npm = $1 AND k.id_tubes = $2
    LIMIT 1
  `;
  const { rows } = await pool.query(query, [npm, idTubes]);
  return rows[0] || null;
};

module.exports = {
  getKelompokByTubesDB,
  getKelompokMahasiswaDB
};
