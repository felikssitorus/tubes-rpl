// src/models/mengajarModel.js
const pool = require("../config/db"); // sesuaikan path db.js-mu

// Mendapatkan semua pengajar per mata kuliah dibuka
const getPengajarByMkDibuka = async (id_mk_dibuka) => {
  const query = `
    SELECT d.nik, d.nama, d.email
    FROM mengajar m
    JOIN dosen d ON m.nik = d.nik
    WHERE m.id_mk_dibuka = $1
  `;
  const { rows } = await pool.query(query, [id_mk_dibuka]);
  return rows;
};

// Mendapatkan semua pengajar beserta mata kuliah yang diajar
const getAllMengajar = async () => {
  const query = `
    SELECT mkd.id_mk_dibuka, mk.nama_mata_kuliah, d.nik, d.nama, d.email
    FROM mengajar m
    JOIN dosen d ON m.nik = d.nik
    JOIN mata_kuliah_dibuka mkd ON m.id_mk_dibuka = mkd.id_mk_dibuka
    JOIN mata_kuliah mk ON mkd.id_mata_kuliah = mk.id_mata_kuliah
    ORDER BY mk.nama_mata_kuliah, d.nama
  `;
  const { rows } = await pool.query(query);
  return rows;
};

module.exports = { getPengajarByMkDibuka, getAllMengajar };
