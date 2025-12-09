const pool = require("../config/db");

// Ambil daftar semua kelompok dan anggota berdasarkan id_tubes
const getKelompokByMataKuliah = async (idMkDibuka) => {
  const query = `
    SELECT k.id_kelompok, k.nama_kelompok, m.npm, m.nama
    FROM kelompok k
    LEFT JOIN anggota_kelompok ak ON k.id_kelompok = ak.id_kelompok
    LEFT JOIN mahasiswa m ON ak.npm = m.npm
    WHERE k.id_tubes = $1
    ORDER BY k.nama_kelompok, m.nama
  `;
  const { rows } = await pool.query(query, [idMkDibuka]);
  return rows;
};

// Ambil kelompok mahasiswa tertentu berdasarkan id_mk_dibuka dan npm
const getKelompokByMahasiswa = async (idMkDibuka, npm) => {
  const query = `
    SELECT k.id_kelompok, k.nama_kelompok
    FROM kelompok k
    JOIN anggota_kelompok ak ON k.id_kelompok = ak.id_kelompok
    JOIN tugas_besar t ON k.id_tubes = t.id_tubes
    WHERE t.id_mk_dibuka = $1 AND ak.npm = $2
  `;
  const { rows } = await pool.query(query, [idMkDibuka, npm]);
  return rows[0] || null; // Hanya 1 kelompok per mahasiswa
};

// Join kelompok mahasiswa
const joinKelompok = async (idMkDibuka, namaKelompok, npm) => {
  try {
    // Cari id_kelompok dari idMkDibuka dan namaKelompok
    const idKelompokQuery = `
      SELECT k.id_kelompok, k.id_tubes
      FROM kelompok k
      JOIN tugas_besar t ON k.id_tubes = t.id_tubes
      WHERE t.id_mk_dibuka = $1 AND k.nama_kelompok = $2
    `;
    const { rows } = await pool.query(idKelompokQuery, [idMkDibuka, namaKelompok]);
    if (!rows[0]) return { success: false, message: "Kelompok tidak ditemukan" };

    const { id_kelompok, id_tubes } = rows[0];

    // Cek apakah mahasiswa sudah tergabung di kelompok manapun di tugas ini
    const cekKelompokLainQuery = `
      SELECT ak.*
      FROM anggota_kelompok ak
      JOIN kelompok k ON ak.id_kelompok = k.id_kelompok
      WHERE ak.npm = $1 AND k.id_tubes = $2
    `;
    const cek = await pool.query(cekKelompokLainQuery, [npm, id_tubes]);
    if (cek.rows.length > 0) {
      return { success: false, message: "Mahasiswa sudah tergabung di kelompok lain untuk tugas ini" };
    }

    // Insert anggota
    const insertQuery = `INSERT INTO anggota_kelompok (npm, id_kelompok) VALUES ($1, $2)`;
    await pool.query(insertQuery, [npm, id_kelompok]);
    return { success: true, message: "Berhasil join kelompok" };

  } catch (err) {
    console.error("ERROR joinKelompok:", err);
    return { success: false, message: "Terjadi kesalahan server" };
  }
};

module.exports = {
  getKelompokByMataKuliah,
  getKelompokByMahasiswa,
  joinKelompok,
};
