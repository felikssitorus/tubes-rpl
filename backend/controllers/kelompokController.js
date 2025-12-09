const pool = require("../config/db");
const { getKelompokByMataKuliah, getKelompokByMahasiswa, joinKelompok } = require("../models/kelompokModels");

// Ambil semua kelompok + anggota untuk mata kuliah tertentu
exports.fetchKelompok = async (req, res) => {
  try {
    const { idMkDibuka } = req.params;
    const data = await getKelompokByMataKuliah(idMkDibuka);

    const result = {};
    data.forEach(row => {
      if (!result[row.nama_kelompok]) result[row.nama_kelompok] = [];
      if (row.npm) result[row.nama_kelompok].push({ npm: row.npm, nama: row.nama });
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil data kelompok" });
  }
};

// Ambil kelompok mahasiswa login + anggota
exports.fetchKelompokMahasiswa = async (req, res) => {
  try {
    const { idMkDibuka, npm } = req.params;

    // Ambil kelompok mahasiswa
    const kelompok = await getKelompokByMahasiswa(idMkDibuka, npm);

    if (!kelompok) {
      return res.json({ message: "Mahasiswa belum tergabung di kelompok manapun", anggota: [] });
    }

    // Ambil semua anggota kelompok tersebut
    const anggotaQuery = `
      SELECT m.npm, m.nama
      FROM anggota_kelompok ak
      JOIN mahasiswa m ON ak.npm = m.npm
      WHERE ak.id_kelompok = $1
      ORDER BY m.nama
    `;
    const { rows: anggota } = await pool.query(anggotaQuery, [kelompok.id_kelompok]);

    res.json({
      id_kelompok: kelompok.id_kelompok,
      nama_kelompok: kelompok.nama_kelompok,
      anggota
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil kelompok mahasiswa" });
  }
};

// POST join kelompok
exports.postJoinKelompok = async (req, res) => {
  try {
    const { idMkDibuka, namaKelompok, npm } = req.body;

    if (!idMkDibuka || !namaKelompok || !npm) {
      return res.status(400).json({ message: "idMkDibuka, namaKelompok, dan npm wajib diisi" });
    }

    const result = await joinKelompok(idMkDibuka, namaKelompok, npm);

    if (result.success) {
      // Ambil id_kelompok dari namaKelompok + idMkDibuka
      const idKelompokQuery = `
        SELECT k.id_kelompok
        FROM kelompok k
        JOIN tugas_besar t ON k.id_tubes = t.id_tubes
        WHERE t.id_mk_dibuka = $1 AND k.nama_kelompok = $2
      `;
      const { rows } = await pool.query(idKelompokQuery, [idMkDibuka, namaKelompok]);
      const id_kelompok = rows[0].id_kelompok;

      // Ambil semua anggota kelompok
      const anggotaQuery = `
        SELECT m.npm, m.nama
        FROM anggota_kelompok ak
        JOIN mahasiswa m ON ak.npm = m.npm
        WHERE ak.id_kelompok = $1
        ORDER BY m.nama
      `;
      const { rows: anggota } = await pool.query(anggotaQuery, [id_kelompok]);

      return res.json({ message: result.message, anggota });
    } else {
      return res.status(400).json({ message: result.message });
    }

  } catch (err) {
    console.error("Error postJoinKelompok:", err);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
