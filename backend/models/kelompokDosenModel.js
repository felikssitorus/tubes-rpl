const pool = require("../config/db");

// GET all kelompok dengan jumlah anggota
const getAll = async () => {
  const result = await pool.query(`
    SELECT k.id_kelompok, k.id_tubes, k.nama_kelompok, COUNT(ak.npm) as jumlah_anggota
    FROM kelompok k
    LEFT JOIN anggota_kelompok ak ON k.id_kelompok = ak.id_kelompok
    GROUP BY k.id_kelompok, k.id_tubes, k.nama_kelompok
    ORDER BY k.nama_kelompok ASC
  `);
  return result.rows;
};

// GET kelompok by ID dengan detail anggota
const getById = async (id) => {
  const kelompokResult = await pool.query(
    "SELECT * FROM kelompok WHERE id_kelompok = $1",
    [id]
  );
  
  if (kelompokResult.rows.length === 0) {
    return null;
  }
  
  const anggotaResult = await pool.query(`
    SELECT ak.npm, m.nama, m.kelas
    FROM anggota_kelompok ak
    JOIN mahasiswa m ON ak.npm = m.npm
    WHERE ak.id_kelompok = $1
    ORDER BY m.nama ASC
  `, [id]);
  
  return {
    ...kelompokResult.rows[0],
    anggota: anggotaResult.rows
  };
};

// GET kelompok by id_tubes
const getByIdTubes = async (id_tubes) => {
  const result = await pool.query(`
    SELECT k.id_kelompok, k.id_tubes, k.nama_kelompok, k.max_anggota, COUNT(ak.npm) as jumlah_anggota
    FROM kelompok k
    LEFT JOIN anggota_kelompok ak ON k.id_kelompok = ak.id_kelompok
    WHERE k.id_tubes = $1
    GROUP BY k.id_kelompok, k.id_tubes, k.nama_kelompok, k.max_anggota
    ORDER BY k.nama_kelompok ASC
  `, [id_tubes]);
  return result.rows;
};

const generateKelompok = async (data) => {
  const { id_tubes, jumlah_kelompok, jumlah_anggota_per_kelompok } = data;
  
  const client = await pool.connect();
  const createdKelompok = [];
  
  try {
    await client.query('BEGIN');
    
    const lastKelompokResult = await client.query(
      `SELECT nama_kelompok FROM kelompok 
       WHERE id_tubes = $1 
       ORDER BY nama_kelompok DESC 
       LIMIT 1`,
      [id_tubes]
    );
    
    let startIndex = 1;
    if (lastKelompokResult.rows.length > 0) {
      const lastNama = lastKelompokResult.rows[0].nama_kelompok;
      const lastChar = lastNama.match(/([A-Z])$/)?.[1];
      if (lastChar) {
        startIndex = lastChar.charCodeAt(0) - 64 + 1;
      }
    }
    
    for (let i = 0; i < jumlah_kelompok; i++) {
      const namaKelompok = `Kelompok ${String.fromCharCode(64 + startIndex + i)}`; 
      
      const result = await client.query(
        'INSERT INTO kelompok (id_tubes, nama_kelompok, max_anggota) VALUES ($1, $2, $3) RETURNING *',
        [id_tubes, namaKelompok, jumlah_anggota_per_kelompok] 
      );
      
      createdKelompok.push({
        ...result.rows[0],
        jumlah_anggota: 0
      });
    }
    
    await client.query('COMMIT');
    return createdKelompok;
    
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// CREATE single kelompok
const create = async (data) => {
  const result = await pool.query(
    "INSERT INTO kelompok (id_tubes, nama_kelompok) VALUES ($1, $2) RETURNING *",
    [data.id_tubes, data.nama_kelompok]
  );
  return result.rows[0];
};

// UPDATE kelompok
const update = async (id_kelompok, data) => {
  const result = await pool.query(
    "UPDATE kelompok SET id_tubes=$1, nama_kelompok=$2 WHERE id_kelompok=$3 RETURNING *",
    [data.id_tubes, data.nama_kelompok, id_kelompok]
  );
  return result.rows[0];
};

// ADD anggota ke kelompok
const addAnggota = async (data) => {
  const { npm, id_kelompok } = data;
  
  const checkExisting = await pool.query(`
    SELECT ak.id_kelompok, k.id_tubes
    FROM anggota_kelompok ak
    JOIN kelompok k ON ak.id_kelompok = k.id_kelompok
    WHERE ak.npm = $1 AND k.id_tubes = (
      SELECT id_tubes FROM kelompok WHERE id_kelompok = $2
    )
  `, [npm, id_kelompok]);
  
  if (checkExisting.rows.length > 0) {
    throw new Error('Mahasiswa sudah terdaftar di kelompok lain untuk tugas besar ini');
  }
  
  const result = await pool.query(
    "INSERT INTO anggota_kelompok (npm, id_kelompok) VALUES ($1, $2) RETURNING *",
    [npm, id_kelompok]
  );
  return result.rows[0];
};

// REMOVE anggota dari kelompok
const removeAnggota = async (npm, id_kelompok) => {
  await pool.query(
    "DELETE FROM anggota_kelompok WHERE npm = $1 AND id_kelompok = $2",
    [npm, id_kelompok]
  );
  return true;
};

// GET mahasiswa by kelas (untuk assign)
const getMahasiswaByKelas = async (kelas) => {
  const result = await pool.query(`
    SELECT m.npm, m.nama, m.email, m.kelas, ak.id_kelompok, k.nama_kelompok
    FROM mahasiswa m
    LEFT JOIN anggota_kelompok ak ON m.npm = ak.npm
    LEFT JOIN kelompok k ON ak.id_kelompok = k.id_kelompok
    WHERE m.kelas = $1
    ORDER BY m.nama ASC
  `, [kelas]);
  return result.rows;
};

// GET mahasiswa yang belum masuk kelompok untuk tubes tertentu
const getMahasiswaAvailable = async (id_tubes, kelas) => {
  const result = await pool.query(`
    SELECT m.npm, m.nama, m.email, m.kelas
    FROM mahasiswa m
    WHERE m.kelas = $1
    AND m.npm NOT IN (
      SELECT ak.npm 
      FROM anggota_kelompok ak
      JOIN kelompok k ON ak.id_kelompok = k.id_kelompok
      WHERE k.id_tubes = $2
    )
    ORDER BY m.nama ASC
  `, [kelas, id_tubes]);
  return result.rows;
};

// GET mahasiswa dalam kelompok untuk tubes tertentu
const getMahasiswaInKelompok = async (id_tubes, kelas) => {
  const result = await pool.query(`
    SELECT m.npm, m.nama, m.email, m.kelas, ak.id_kelompok, k.nama_kelompok
    FROM mahasiswa m
    JOIN anggota_kelompok ak ON m.npm = ak.npm
    JOIN kelompok k ON ak.id_kelompok = k.id_kelompok
    WHERE m.kelas = $1 AND k.id_tubes = $2
    ORDER BY k.nama_kelompok ASC, m.nama ASC
  `, [kelas, id_tubes]);
  return result.rows;
};

// ASSIGN mahasiswa ke kelompok 
const assignMahasiswa = async (assignments) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    for (const assignment of assignments) {
      const { npm, id_kelompok } = assignment;
      
      
      await client.query(`
        DELETE FROM anggota_kelompok 
        WHERE npm = $1 
        AND id_kelompok IN (
          SELECT id_kelompok FROM kelompok WHERE id_tubes = (
            SELECT id_tubes FROM kelompok WHERE id_kelompok = $2
          )
        )
      `, [npm, id_kelompok]);
      
      await client.query(
        'INSERT INTO anggota_kelompok (npm, id_kelompok) VALUES ($1, $2)',
        [npm, id_kelompok]
      );
    }
    
    await client.query('COMMIT');
    return { success: true, count: assignments.length };
    
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// UPDATE max_anggota kelompok
const updateMaxAnggota = async (id_kelompok, max_anggota) => {
  const result = await pool.query(
    "UPDATE kelompok SET max_anggota = $1 WHERE id_kelompok = $2 RETURNING *", [max_anggota, id_kelompok]
  );
  return result.rows[0];
};

// GET lock status by id_tubes
const getLockStatus = async (id_tubes) => {
  const result = await pool.query(
    "SELECT is_locked FROM tugas_besar WHERE id_tubes = $1", [id_tubes]
  );
  return result.rows[0];
};

// LOCK tubes
const lockTubes = async (id_tubes) => {
  const result = await pool.query(
    "UPDATE tugas_besar SET is_locked = TRUE WHERE id_tubes = $1 RETURNING *", [id_tubes]
  );
  return result.rows[0];
};

// UNLOCK tubes
const unlockTubes = async (id_tubes) => {
  const result = await pool.query(
    "UPDATE tugas_besar SET is_locked = FALSE WHERE id_tubes = $1 RETURNING *", [id_tubes]
  );
  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  getByIdTubes,
  generateKelompok,
  create,
  update,
  updateMaxAnggota,
  addAnggota,
  removeAnggota,
  getMahasiswaByKelas,
  getMahasiswaAvailable,
  getMahasiswaInKelompok,
  assignMahasiswa,
  getLockStatus,    
  lockTubes,      
  unlockTubes       
};
