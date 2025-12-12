const { 
  getNilaiByNpm,
  getTubesWithNilai,
  getNilaiByNpmAndTubes
} = require("../models/nilaiModel");

// GET nilai lengkap mahasiswa
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

// GET daftar tubes mahasiswa berdasarkan mata kuliah (optional filter idMk)
const getTubesList = async (req, res) => {
  const { npm } = req.params;
  const { idMk } = req.query; // bisa dikirim via ?idMk=2

  try {
    const tubes = await getTubesWithNilai(npm, idMk);
    res.json(tubes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET nilai berdasarkan tubes tertentu
const getNilaiByTubes = async (req, res) => {
  const { npm, idTubes } = req.params;
  try {
    const nilai = await getNilaiByNpmAndTubes(npm, idTubes);
    res.json(nilai);
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
