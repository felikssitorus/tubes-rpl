const pool = require("../config/db");

// ======================================================
// GET list topik tugas besar berdasarkan MK
// ======================================================
exports.fetchTubesByMk = async (req, res) => {
  try {
    const idMkDibuka = Number(req.params.idMkDibuka);
    const query = `
      SELECT id_tubes, topik_tubes, is_locked
      FROM tugas_besar
      WHERE id_mk_dibuka = $1
      ORDER BY id_tubes
    `;
    const { rows } = await pool.query(query, [idMkDibuka]);
    res.json({ tubes: rows });
  } catch (err) {
    console.error("Error fetchTubesByMk:", err.message, err.stack);
    res.status(500).json({ message: "Gagal mengambil topik tubes" });
  }
};

// ======================================================
// GET kelompok berdasarkan ID_TUBES
// ======================================================
exports.fetchKelompokByTubes = async (req, res) => {
  try {
    const { idTubes } = req.params;

    const query = `
      SELECT k.id_kelompok, k.nama_kelompok, t.is_locked, m.nama
      FROM kelompok k
      JOIN tugas_besar t ON k.id_tubes = t.id_tubes
      LEFT JOIN anggota_kelompok ak ON k.id_kelompok = ak.id_kelompok
      LEFT JOIN mahasiswa m ON ak.npm = m.npm
      WHERE k.id_tubes = $1
      ORDER BY k.id_kelompok, m.nama
    `;
    const { rows } = await pool.query(query, [idTubes]);

    const kelompokMap = {};
    rows.forEach(row => {
      if (!kelompokMap[row.nama_kelompok]) {
        kelompokMap[row.nama_kelompok] = { anggota: [], is_locked: row.is_locked };
      }
      if (row.nama) {
        kelompokMap[row.nama_kelompok].anggota.push({ nama: row.nama });
      }
    });

    res.json(kelompokMap);
  } catch (err) {
    console.error("Error fetchKelompokByTubes:", err);
    res.status(500).json({ message: "Gagal mengambil kelompok berdasarkan tubes" });
  }
};

// ======================================================
// GET kelompok mahasiswa
// ======================================================
exports.fetchKelompokMahasiswa = async (req, res) => {
  try {
    const idTubes = Number(req.params.idTubes);
    const { npm } = req.params;

    const query = `
      SELECT k.id_kelompok, k.nama_kelompok, t.is_locked
      FROM anggota_kelompok ak
      JOIN kelompok k ON ak.id_kelompok = k.id_kelompok
      JOIN tugas_besar t ON k.id_tubes = t.id_tubes
      WHERE ak.npm = $1 AND k.id_tubes = $2
    `;
    const { rows } = await pool.query(query, [npm, idTubes]);

    if (rows.length === 0) {
      return res.json({ message: "Belum masuk kelompok", anggota: [], is_locked: false });
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
      anggota: anggota.rows,
      is_locked: rows[0].is_locked
    });

  } catch (err) {
    console.error("Error fetchKelompokMahasiswa:", err.message, err.stack);
    res.status(500).json({ message: "Gagal load kelompok mahasiswa" });
  }
};

// ======================================================
// POST join kelompok
// ======================================================
exports.postJoinKelompok = async (req, res) => {
  try {
    const { idTubes, namaKelompok, npm } = req.body;
    if (!idTubes || !namaKelompok || !npm) {
      return res.status(400).json({ message: "idTubes, namaKelompok, dan npm wajib diisi" });
    }

    const idTubesNum = Number(idTubes);

    const getKelQuery = `
      SELECT k.id_kelompok, t.is_locked
      FROM kelompok k
      JOIN tugas_besar t ON k.id_tubes = t.id_tubes
      WHERE k.id_tubes = $1 AND k.nama_kelompok = $2
    `;
    const foundKel = await pool.query(getKelQuery, [idTubesNum, namaKelompok]);
    if (foundKel.rows.length === 0) return res.status(400).json({ message: "Kelompok tidak ditemukan" });

    const { id_kelompok, is_locked } = foundKel.rows[0];
    if (is_locked) return res.status(403).json({ message: "Kelompok sudah dikunci, tidak bisa pindah" });

    // Hapus mahasiswa dari semua kelompok di tubes ini
    await pool.query(
      `DELETE FROM anggota_kelompok 
       WHERE npm = $1 AND id_kelompok IN (
          SELECT id_kelompok FROM kelompok WHERE id_tubes = $2
       )`,
      [npm, idTubesNum]
    );

    // Insert ke kelompok baru
    await pool.query(
      `INSERT INTO anggota_kelompok (npm, id_kelompok) VALUES ($1, $2)`,
      [npm, id_kelompok]
    );

    // Ambil anggota terbaru
    const anggotaQuery = `
      SELECT m.nama
      FROM anggota_kelompok ak
      JOIN mahasiswa m ON ak.npm = m.npm
      WHERE ak.id_kelompok = $1
      ORDER BY m.nama
    `;
    const anggota = await pool.query(anggotaQuery, [id_kelompok]);

    res.json({
      message: `Berhasil masuk ke ${namaKelompok}`,
      anggota: anggota.rows
    });

  } catch (err) {
    console.error("Error postJoinKelompok:", err.message, err.stack);
    res.status(500).json({ message: "Gagal join kelompok" });
  }
};
