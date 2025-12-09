// File: backend/controllers/kelompokController.js
const pool = require("../config/db");

// ======================================================
// GET kelompok berdasarkan ID_TUBES
// ======================================================
exports.fetchKelompokByTubes = async (req, res) => {
  try {
    const { idTubes } = req.params;

    // Ambil semua kelompok untuk tubes ini walaupun belum ada anggota
    const query = `
      SELECT k.id_kelompok, k.nama_kelompok, m.nama
      FROM kelompok k
      LEFT JOIN anggota_kelompok ak ON k.id_kelompok = ak.id_kelompok
      LEFT JOIN mahasiswa m ON ak.npm = m.npm
      WHERE k.id_tubes = $1
      ORDER BY k.id_kelompok, m.nama
    `;

    const { rows } = await pool.query(query, [idTubes]);

    // Siapkan struktur kelompok 1-4 jika kosong
    const kelompokMap = {};
    const defaultKelompok = ["Kelompok 1", "Kelompok 2", "Kelompok 3", "Kelompok 4"];

    defaultKelompok.forEach(name => {
      kelompokMap[name] = [];
    });

    rows.forEach(row => {
      if (row.nama_kelompok) {
        if (!kelompokMap[row.nama_kelompok]) {
          kelompokMap[row.nama_kelompok] = [];
        }
        if (row.nama) {
          kelompokMap[row.nama_kelompok].push({ nama: row.nama });
        }
      }
    });

    res.json(kelompokMap);

  } catch (err) {
    console.error("Error fetchKelompokByTubes:", err);
    res.status(500).json({ message: "Gagal mengambil kelompok berdasarkan tubes" });
  }
};


// GET kelompok mahasiswa
exports.fetchKelompokMahasiswa = async (req, res) => {
  try {
    const { idTubes, npm } = req.params;

    const query = `
      SELECT k.id_kelompok, k.nama_kelompok
      FROM anggota_kelompok ak
      JOIN kelompok k ON ak.id_kelompok = k.id_kelompok
      WHERE ak.npm = $1 AND k.id_tubes = $2
    `;
    const { rows } = await pool.query(query, [npm, idTubes]);

    if (rows.length === 0) {
      return res.json({ message: "Belum masuk kelompok", anggota: [] });
    }

    const idKelompok = rows[0].id_kelompok;
    const anggotaQuery = `
      SELECT m.nama
      FROM anggota_kelompok ak
      JOIN mahasiswa m ON ak.npm = m.npm
      WHERE ak.id_kelompok = $1
      ORDER BY m.nama
    `;
    const anggota = await pool.query(anggotaQuery, [idKelompok]);

    res.json({
      nama_kelompok: rows[0].nama_kelompok,
      anggota: anggota.rows
    });
  } catch (err) {
    console.error("Error fetchKelompokMahasiswa:", err);
    res.status(500).json({ message: "Gagal load kelompok mahasiswa" });
  }
};

// POST join kelompok
exports.postJoinKelompok = async (req, res) => {
  try {
    const { idTubes, namaKelompok, npm } = req.body;

    if (!idTubes || !namaKelompok || !npm) {
      return res.status(400).json({
        message: "idTubes, namaKelompok, dan npm wajib diisi"
      });
    }

    const getKelQuery = `
      SELECT id_kelompok
      FROM kelompok
      WHERE id_tubes = $1 AND nama_kelompok = $2
    `;
    const foundKel = await pool.query(getKelQuery, [idTubes, namaKelompok]);
    if (foundKel.rows.length === 0) return res.status(400).json({ message: "Kelompok tidak ditemukan" });

    const idKelompok = foundKel.rows[0].id_kelompok;

    // hapus anggota lama
    await pool.query(
      `DELETE FROM anggota_kelompok 
       WHERE npm = $1 AND id_kelompok IN (
          SELECT id_kelompok FROM kelompok WHERE id_tubes = $2
       )`,
      [npm, idTubes]
    );

    await pool.query(
      `INSERT INTO anggota_kelompok (npm, id_kelompok) VALUES ($1, $2)`,
      [npm, idKelompok]
    );

    const anggotaQuery = `
      SELECT m.nama
      FROM anggota_kelompok ak
      JOIN mahasiswa m ON ak.npm = m.npm
      WHERE ak.id_kelompok = $1
      ORDER BY m.nama
    `;
    const anggota = await pool.query(anggotaQuery, [idKelompok]);

    res.json({
      message: `Berhasil masuk ke ${namaKelompok}`,
      anggota: anggota.rows
    });
  } catch (err) {
    console.error("Error postJoinKelompok:", err);
    res.status(500).json({ message: "Gagal join kelompok" });
  }
};
