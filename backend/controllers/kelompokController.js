const db = require('../config/db');

// GET daftar topik tugas besar per MK
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
    res.json({ tubes: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET kelompok per tubes
const fetchKelompokByTubes = async (req, res) => {
  try {
    const idTubes = req.params.idTubes;
    const query = `
      SELECT k.nama_kelompok, array_agg(m.nama) AS anggota
      FROM kelompok k
      LEFT JOIN anggota_kelompok ak ON k.id_kelompok = ak.id_kelompok
      LEFT JOIN mahasiswa m ON ak.npm = m.npm
      WHERE k.id_tubes = $1
      GROUP BY k.nama_kelompok
    `;
    const result = await db.query(query, [idTubes]);
    const kelompok = {};
    result.rows.forEach(row => {
      kelompok[row.nama_kelompok] = row.anggota.filter(Boolean);
    });

    // Ambil status is_locked dari tabel tugas_besar
    const lockQuery = `SELECT is_locked FROM tugas_besar WHERE id_tubes = $1`;
    const lockRes = await db.query(lockQuery, [idTubes]);
    const tubes_locked = lockRes.rows[0]?.is_locked || false;

    res.json({ kelompok, tubes_locked });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET kelompok mahasiswa per tubes
const fetchKelompokMahasiswa = async (req, res) => {
  try {
    const { idTubes, npm } = req.params;
    const query = `
      SELECT k.nama_kelompok, array_agg(m.nama) AS anggota
      FROM kelompok k
      JOIN anggota_kelompok ak ON k.id_kelompok = ak.id_kelompok
      LEFT JOIN mahasiswa m ON ak.npm = m.npm
      WHERE k.id_tubes = $1 AND ak.npm = $2
      GROUP BY k.nama_kelompok
    `;
    const result = await db.query(query, [idTubes, npm]);
    if (result.rows.length === 0) return res.json(null);
    const row = result.rows[0];
    res.json({ nama_kelompok: row.nama_kelompok, anggota: row.anggota, is_locked: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST join kelompok
const postJoinKelompok = async (req, res) => {
  try {
    const { idTubes, namaKelompok, npm } = req.body;

    // ambil id_kelompok
    const idKelQuery = `SELECT id_kelompok FROM kelompok WHERE id_tubes = $1 AND nama_kelompok = $2`;
    const { rows } = await db.query(idKelQuery, [idTubes, namaKelompok]);
    if (!rows[0]) return res.status(404).json({ error: "Kelompok tidak ditemukan" });
    const idKelompok = rows[0].id_kelompok;

    // cek apakah tubes sudah dikunci
    const lockQuery = `SELECT is_locked FROM tugas_besar WHERE id_tubes = $1`;
    const lockRes = await db.query(lockQuery, [idTubes]);
    if (lockRes.rows[0]?.is_locked) {
      return res.status(403).json({ error: "Tugas besar sudah dikunci, tidak bisa join kelompok" });
    }

    // insert anggota
    const insertQuery = `
      INSERT INTO anggota_kelompok (npm, id_kelompok)
      VALUES ($1, $2)
      ON CONFLICT (npm, id_kelompok) DO NOTHING
    `;
    await db.query(insertQuery, [npm, idKelompok]);
    res.json({ message: `Berhasil join ke ${namaKelompok}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTubesByMk,
  fetchKelompokByTubes,
  fetchKelompokMahasiswa,
  postJoinKelompok
};

module.exports = {
  getTubesByMk,
  fetchKelompokByTubes,
  fetchKelompokMahasiswa,
  postJoinKelompok
};
