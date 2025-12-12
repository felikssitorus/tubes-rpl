const { 
  getNilaiByNpm,
  getTubesWithNilai,
  getNilaiByNpmAndTubes
} = require("../models/nilaiModel");

// existing controller
const getNilaiMahasiswa = async (req, res) => {
  const { npm } = req.params;
  try {
    const nilai = await getNilaiByNpm(npm);
    res.json(nilai);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// ================================================
// 1️⃣ GET daftar tubes yang punya nilai
// ================================================
const getTubesList = async (req, res) => {
  const { npm } = req.params;
  try {
    const rows = await getTubesWithNilai(npm);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// ================================================
// 2️⃣ GET nilai berdasarkan tubes tertentu
// ================================================
const getNilaiByTubes = async (req, res) => {
  const { npm, idTubes } = req.params;
  try {
    const rows = await getNilaiByNpmAndTubes(npm, idTubes);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getNilaiMahasiswa,
  getTubesList,
  getNilaiByTubes
};
