// const Tubes = require("../models/tubesModel");

// exports.getAllTubes = async (req, res) => {
//   try {
//     const data = await Tubes.getAll();
//     res.json(data);
//   } catch (error) {
//     console.error("Error getAllTubes:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getTubes = async (req, res) => {
//   try {
//     const data = await Tubes.getById(req.params.id_tubes);
//     if (!data) {
//       return res.status(404).json({ error: "Tugas Besar not found" });
//     }
//     res.json(data);
//   } catch (error) {
//     console.error("Error getTubes:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getTubesByMataKuliah = async (req, res) => {
//   try {
//     const data = await Tubes.getByMataKuliahDibuka(req.params.id_mk_dibuka);
//     res.json(data);
//   } catch (error) {
//     console.error("Error getTubesByMataKuliah:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.createTubes = async (req, res) => {
//   try {
//     console.log("Request body:", req.body);
    
//     const data = await Tubes.create(req.body);
    
//     console.log("Tubes created:", data);
//     res.json({ message: "Tugas Besar created", data });
//   } catch (error) {
//     console.error("Error createTubes:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateTubes = async (req, res) => {
//   try {
//     const data = await Tubes.update(req.params.id_tubes, req.body);
//     res.json({ message: "Tugas Besar updated", data });
//   } catch (error) {
//     console.error("Error updateTubes:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteTubes = async (req, res) => {
//   try {
//     await Tubes.remove(req.params.id_tubes);
//     res.json({ message: "Tugas Besar deleted" });
//   } catch (error) {
//     console.error("Error deleteTubes:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

const Tubes = require("../models/tubesModel");
const pool = require("../config/db");

exports.getAllTubes = async (req, res) => {
  const data = await Tubes.getAll();
  res.json(data);
};

exports.getTubes = async (req, res) => {
  const data = await Tubes.getById(req.params.id_tubes);
  if (!data) {
    return res.status(404).json({ error: "Tugas Besar not found" });
  }
  res.json(data);
};

exports.getTubesByMataKuliah = async (req, res) => {
  const data = await Tubes.getByMataKuliahDibuka(req.params.id_mk_dibuka);
  res.json(data);
};

exports.createTubes = async (req, res) => {
  const data = await Tubes.create(req.body);
  res.json({ message: "Tugas Besar created", data });
};

exports.updateTubes = async (req, res) => {
  const data = await Tubes.update(req.params.id_tubes, req.body);
  res.json({ message: "Tugas Besar updated", data });
};

exports.deleteTubes = async (req, res) => {
  await Tubes.remove(req.params.id_tubes);
  res.json({ message: "Tugas Besar deleted" });
};

// Ambil semua topik tugas besar untuk idMkDibuka tertentu
exports.getTubesByMkDibukaController = async (req, res) => {
  const { idMkDibuka } = req.params;
  try {
    const query = `
      SELECT id_tubes, topik_tubes
      FROM tugas_besar
      WHERE id_mk_dibuka = $1
      ORDER BY id_tubes
    `;
    const { rows } = await pool.query(query, [idMkDibuka]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Tidak ada topik tugas besar ditemukan" });
    }
    res.json({ message: "Topik tugas besar ditemukan", tubes: rows });
  } catch (err) {
    console.error("Error getTubesByMkDibukaController:", err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};