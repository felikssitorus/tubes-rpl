// const Nilai = require("../models/nilaiModel");

// exports.getNilaiByKomponen = async (req, res) => {
//   try {
//     const data = await Nilai.getNilaiByKomponen(req.params.id_komponen);
//     res.json(data);
//   } catch (error) {
//     console.error("Error getNilaiByKomponen:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getNilaiByKelompokKomponen = async (req, res) => {
//   try {
//     const { id_kelompok, id_komponen } = req.params;
//     const data = await Nilai.getNilaiByKelompokKomponen(id_kelompok, id_komponen);
//     res.json(data);
//   } catch (error) {
//     console.error("Error getNilaiByKelompokKomponen:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAnggotaKelompok = async (req, res) => {
//   try {
//     const data = await Nilai.getAnggotaKelompok(req.params.id_kelompok);
//     res.json(data);
//   } catch (error) {
//     console.error("Error getAnggotaKelompok:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.saveNilai = async (req, res) => {
//   try {
//     console.log("Request body:", req.body);
    
//     const data = await Nilai.saveNilai(req.body);
    
//     console.log("Nilai saved:", data);
//     res.json({ message: "Nilai berhasil disimpan", data });
//   } catch (error) {
//     console.error("Error saveNilai:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteNilai = async (req, res) => {
//   try {
//     const { npm, id_komponen } = req.params;
//     await Nilai.remove(npm, id_komponen);
//     res.json({ message: "Nilai deleted" });
//   } catch (error) {
//     console.error("Error deleteNilai:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

const Nilai = require("../models/nilaiModel");

exports.getNilaiByKomponen = async (req, res) => {
  const data = await Nilai.getNilaiByKomponen(req.params.id_komponen);
  res.json(data);
};

exports.getNilaiByKelompokKomponen = async (req, res) => {
  const { id_kelompok, id_komponen } = req.params;
  const data = await Nilai.getNilaiByKelompokKomponen(id_kelompok, id_komponen);
  res.json(data);
};

exports.getAnggotaKelompok = async (req, res) => {
  const data = await Nilai.getAnggotaKelompok(req.params.id_kelompok);
  res.json(data);
};

exports.saveNilai = async (req, res) => {
  const data = await Nilai.saveNilai(req.body);
  res.json({ message: "Nilai berhasil disimpan", data });
};

exports.deleteNilai = async (req, res) => {
  const { npm, id_komponen } = req.params;
  await Nilai.remove(npm, id_komponen);
  res.json({ message: "Nilai deleted" });
};