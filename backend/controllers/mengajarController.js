// src/controllers/mengajarController.js
const MengajarModel = require("../models/mengajarModel");

// GET pengajar per mata kuliah dibuka
const getPengajarPerMkDibuka = async (req, res) => {
  try {
    const { id_mk_dibuka } = req.params;
    const dosen = await MengajarModel.getPengajarByMkDibuka(id_mk_dibuka);
    res.json(dosen);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil pengajar" });
  }
};

// GET semua mengajar (semua dosen dan mata kuliah)
const getAllMengajar = async (req, res) => {
  try {
    const data = await MengajarModel.getAllMengajar();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data mengajar" });
  }
};

module.exports = { getPengajarPerMkDibuka, getAllMengajar };
