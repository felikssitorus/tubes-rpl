const pool = require("../config/db");

// GET nilai mahasiswa by komponen
const getNilaiByKomponen = async (id_komponen) => {
  const result = await pool.query(`
    SELECT n.*, m.nama, m.npm
    FROM nilai n
    JOIN mahasiswa m ON n.npm = m.npm
    WHERE n.id_komponen = $1
    ORDER BY m.nama ASC
  `, [id_komponen]);
  return result.rows;
};

// GET nilai mahasiswa by kelompok dan komponen
const getNilaiByKelompokKomponen = async (id_kelompok, id_komponen) => {
  const result = await pool.query(`
    SELECT m.npm, m.nama, n.nilai, n.catatan, n.jadwal
    FROM mahasiswa m
    JOIN anggota_kelompok ak ON m.npm = ak.npm
    LEFT JOIN nilai n ON m.npm = n.npm AND n.id_komponen = $2
    WHERE ak.id_kelompok = $1
    ORDER BY m.nama ASC
  `, [id_kelompok, id_komponen]);
  return result.rows;
};

// GET anggota kelompok untuk penilaian
const getAnggotaKelompok = async (id_kelompok) => {
  const result = await pool.query(`
    SELECT m.npm, m.nama, m.kelas
    FROM mahasiswa m
    JOIN anggota_kelompok ak ON m.npm = ak.npm
    WHERE ak.id_kelompok = $1
    ORDER BY m.nama ASC
  `, [id_kelompok]);
  return result.rows;
};

// CREATE or UPDATE nilai (batch)
const saveNilai = async (data) => {
  const { id_komponen, nilai_list, catatan_umum } = data;
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    for (const item of nilai_list) {
      const { npm, nilai } = item;
      
      const checkResult = await client.query(
        'SELECT * FROM nilai WHERE npm = $1 AND id_komponen = $2',
        [npm, id_komponen]
      );
      
      if (checkResult.rows.length > 0) {
        await client.query(
          'UPDATE nilai SET nilai = $1, catatan = $2, jadwal = CURRENT_DATE WHERE npm = $3 AND id_komponen = $4',
          [nilai, catatan_umum || null, npm, id_komponen]
        );
      } else {
        await client.query(
          'INSERT INTO nilai (npm, id_komponen, nilai, catatan, jadwal) VALUES ($1, $2, $3, $4, CURRENT_DATE)',
          [npm, id_komponen, nilai, catatan_umum || null]
        );
      }
    }
    await client.query('COMMIT');
    return { success: true, count: nilai_list.length };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// DELETE nilai
const remove = async (npm, id_komponen) => {
  await pool.query(
    'DELETE FROM nilai WHERE npm = $1 AND id_komponen = $2',
    [npm, id_komponen]
  );
  return true;
};

module.exports = {
  getNilaiByKomponen,
  getNilaiByKelompokKomponen,
  getAnggotaKelompok,
  saveNilai,
  remove
};