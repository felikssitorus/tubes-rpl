const db = require('../config/db');

// GET daftar topik tugas besar per MK (termasuk is_locked)
const getTubesByMk = async (req, res) => {
  try {
    const idMkDibuka = req.params.idMkDibuka;
    const query = `
      SELECT id_tubes, topik_tubes, is_locked
      FROM tugas_besar
      WHERE id_mk_dibuka = $1
      ORDER BY id_tubes
    `;
    const result = await db.query(query, [idMkDibuka]);

    // Kirim data termasuk is_locked
    const tubes = result.rows.map(row => ({
      id_tubes: row.id_tubes,
      topik_tubes: row.topik_tubes,
      is_locked: row.is_locked
    }));

    res.json({ tubes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET kelompok per tubes (termasuk is_locked dari tugas_besar)
const fetchKelompokByTubes = async (req, res) => {
  try {
    const idTubes = req.params.idTubes;

    // Ambil kelompok mahasiswa
    const queryKelompok = `
      SELECT k.nama_kelompok, array_agg(m.nama) AS anggota
      FROM kelompok k
      LEFT JOIN anggota_kelompok ak ON k.id_kelompok = ak.id_kelompok
      LEFT JOIN mahasiswa m ON ak.npm = m.npm
      WHERE k.id_tubes = $1
      GROUP BY k.nama_kelompok
    `;
    const kelompokResult = await db.query(queryKelompok, [idTubes]);

    const kelompok = {};
    kelompokResult.rows.forEach(row => {
      kelompok[row.nama_kelompok] = row.anggota.filter(Boolean);
    });

    // Ambil status is_locked dari tugas_besar
    const tubesQuery = `SELECT is_locked FROM tugas_besar WHERE id_tubes = $1`;
    const tubesRes = await db.query(tubesQuery, [idTubes]);
    const tubes_locked = tubesRes.rows[0]?.is_locked || false;

    res.json({ kelompok, tubes_locked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET kelompok mahasiswa per tubes
const fetchKelompokMahasiswa = async (req, res) => {
  try {
    const { idTubes, npm } = req.params;

    const query = `
      SELECT k.nama_kelompok, array_agg(m.nama) AS anggota
      FROM anggota_kelompok ak
      JOIN kelompok k ON ak.id_kelompok = k.id_kelompok
      LEFT JOIN mahasiswa m ON ak.npm = m.npm
      WHERE ak.npm = $1 AND k.id_tubes = $2
      GROUP BY k.nama_kelompok
      LIMIT 1
    `;
    const result = await db.query(query, [npm, idTubes]);

    if (!result.rows[0]) return res.json(null);

    const row = result.rows[0];

    // Ambil status is_locked dari tugas_besar
    const tubesQuery = `SELECT is_locked FROM tugas_besar WHERE id_tubes = $1`;
    const tubesRes = await db.query(tubesQuery, [idTubes]);
    const is_locked = tubesRes.rows[0]?.is_locked || false;

    res.json({
      nama_kelompok: row.nama_kelompok,
      anggota: row.anggota.filter(Boolean),
      is_locked
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// POST join kelompok
const postJoinKelompok = async (req, res) => {
  try {
    const { idTubes, namaKelompok, npm } = req.body;

    // Cek apakah tubes sudah dikunci
    const tubesQuery = `SELECT is_locked FROM tugas_besar WHERE id_tubes = $1`;
    const tubesRes = await db.query(tubesQuery, [idTubes]);
    const is_locked = tubesRes.rows[0]?.is_locked || false;

    if (is_locked) {
      return res.status(403).json({ error: "Tubes sudah dikunci, tidak bisa ganti kelompok" });
    }

    // Ambil id_kelompok
    const idKelQuery = `SELECT id_kelompok FROM kelompok WHERE id_tubes = $1 AND nama_kelompok = $2`;
    const { rows } = await db.query(idKelQuery, [idTubes, namaKelompok]);
    if (!rows[0]) return res.status(404).json({ error: "Kelompok tidak ditemukan" });
    const idKelompok = rows[0].id_kelompok;

    // Insert anggota
    const insertQuery = `
      INSERT INTO anggota_kelompok (npm, id_kelompok)
      VALUES ($1, $2)
      ON CONFLICT (npm, id_kelompok) DO NOTHING
    `;
    await db.query(insertQuery, [npm, idKelompok]);
    res.json({ message: `Berhasil join ke ${namaKelompok}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTubesByMk,
  fetchKelompokByTubes,
  fetchKelompokMahasiswa,
  postJoinKelompok
};
