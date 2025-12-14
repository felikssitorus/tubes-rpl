const Matkul = require("../models/matkulModel");

exports.getAllMatkul = async (req, res) => {
  const data = await Matkul.getAll();
  res.json(data);
};

exports.getMatkul = async (req, res) => {
  const data = await Matkul.getById(req.params.id_mk_dibuka);
  if (!data) {
    return res.status(404).json({ error: "Mata kuliah tidak ditemukan" });
  }
  res.json(data);
};

exports.createMatkul = async (req, res) => {
  const data = await Matkul.create(req.body);
  res.json({ message: "Matkul created", data });
};

exports.updateMatkul = async (req, res) => {
  const data = await Matkul.update(req.params.id_mk_dibuka, req.body);
  res.json({ message: "Matkul updated", data });
};

exports.deleteMatkul = async (req, res) => {
  await Matkul.remove(req.params.id_mk_dibuka);
  res.json({ message: "Matkul deleted" });
};