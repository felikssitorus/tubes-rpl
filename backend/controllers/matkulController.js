const Matkul = require("../models/matkulModel");

exports.getAllMatkul = async (req, res) => {
  try {
    // Nanti bisa ditambahkan filter berdasarkan dosen yang login
    // const { nik } = req.user; // Dari JWT token
    const data = await Matkul.getAll();
    console.log("📚 Data Matkul:", data); // Debug
    res.json(data);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Error fetching matkul", error: error.message });
  }
};

exports.getMatkul = async (req, res) => {
  try {
    const data = await Matkul.getById(req.params.id_mk_dibuka);
    if (!data) return res.status(404).json({ message: "Matkul not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matkul", error: error.message });
  }
};