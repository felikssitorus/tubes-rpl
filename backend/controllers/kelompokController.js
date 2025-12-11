import db from '../db.js'; // koneksi database

export const getTubesByMk = async (idMkDibuka) => {
  const query = `
    SELECT id_tubes, topik_tubes, is_locked
    FROM tugas_besar
    WHERE id_mk_dibuka = $1
    ORDER BY id_tubes
  `;
  const result = await db.query(query, [idMkDibuka]);
  return result.rows;
};

export const getKelompokByTubes = async (idTubes) => {
  const query = `
    SELECT k.nama_kelompok, array_agg(a.npm) AS anggota_npm
    FROM kelompok k
    LEFT JOIN anggota_kelompok a ON k.id_kelompok = a.id_kelompok
    WHERE k.id_tubes = $1
    GROUP BY k.nama_kelompok
  `;
  const result = await db.query(query, [idTubes]);
  const kelompok = {};
  result.rows.forEach(row => {
    kelompok[row.nama_kelompok] = row.anggota_npm.filter(Boolean);
  });
  return kelompok;
};

export const getMyKelompok = async (idTubes, npm) => {
  const query = `
    SELECT k.nama_kelompok, array_agg(a2.npm) AS anggota_npm
    FROM kelompok k
    JOIN anggota_kelompok a ON k.id_kelompok = a.id_kelompok
    LEFT JOIN anggota_kelompok a2 ON k.id_kelompok = a2.id_kelompok
    WHERE k.id_tubes = $1 AND a.npm = $2
    GROUP BY k.nama_kelompok
  `;
  const result = await db.query(query, [idTubes, npm]);
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return { nama_kelompok: row.nama_kelompok, anggota: row.anggota_npm.filter(Boolean) };
};

export const joinKelompok = async (idTubes, namaKelompok, npm) => {
  // ambil id_kelompok
  const idKelQuery = `SELECT id_kelompok FROM kelompok WHERE id_tubes = $1 AND nama_kelompok = $2`;
  const { rows } = await db.query(idKelQuery, [idTubes, namaKelompok]);
  if (!rows[0]) throw new Error("Kelompok tidak ditemukan");
  const idKelompok = rows[0].id_kelompok;

  // insert anggota
  const insertQuery = `
    INSERT INTO anggota_kelompok (npm, id_kelompok)
    VALUES ($1, $2)
    ON CONFLICT (npm, id_kelompok) DO NOTHING
  `;
  await db.query(insertQuery, [npm, idKelompok]);
  return { message: `Berhasil join ke ${namaKelompok}` };
};
