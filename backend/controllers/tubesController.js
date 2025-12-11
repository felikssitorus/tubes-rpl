const Tubes = require("../models/tubesModel");

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