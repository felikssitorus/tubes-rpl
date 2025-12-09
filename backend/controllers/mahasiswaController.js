const Mahasiswa = require("../models/mahasiswaModel");

exports.getMahasiswaByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const mahasiswa = await Mahasiswa.getByEmail(email);
    if (!mahasiswa) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }
    res.json(mahasiswa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.getAllMahasiswa = async (req, res) => {
  try {
    const mahasiswaList = await Mahasiswa.getAll();
    res.json(mahasiswaList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};


