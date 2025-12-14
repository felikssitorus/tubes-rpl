const Tubes = require("../models/tubesDosenModel");

exports.getAllTubes = async (req, res) => {
  const { id_mk_dibuka } = req.query;  
  const data = await Tubes.getAll(id_mk_dibuka);
  res.json(data);
};

exports.getTubes = async (req, res) => {
  const data = await Tubes.getById(req.params.id_tubes);
  res.json(data);
};

exports.createTubes = async (req, res) => {
  const data = await Tubes.create(req.body);
  res.json({ message: "Tubes created", data });
};

exports.updateTubes = async (req, res) => {
  const data = await Tubes.update(req.params.id_tubes, req.body);
  res.json({ message: "Tubes updated", data });
};

exports.deleteTubes = async (req, res) => {
  await Tubes.remove(req.params.id_tubes);
  res.json({ message: "Tubes deleted" });
};