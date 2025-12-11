const { getNilaiByNpm } = require("../models/nilaiModel");

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

module.exports = { getNilaiMahasiswa };
