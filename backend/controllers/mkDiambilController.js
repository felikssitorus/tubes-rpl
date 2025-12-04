const MkDiambilModel = require("../models/mkDiambilModel");

exports.getMkDiambilByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const data = await MkDiambilModel.getMkDiambilByEmail(email);

    if (data.length === 0) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan atau tidak mengambil mata kuliah." });
    }

    res.json({
      message: "List mata kuliah yang diambil ditemukan",
      mata_kuliah: data
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
