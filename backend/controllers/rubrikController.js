const Rubrik = require("../models/rubrikModel");

exports.getAllRubrik = async (req, res) => {
  const data = await Rubrik.getAll();
  res.json(data);
};

exports.getRubrik = async (req, res) => {
  const data = await Rubrik.getById(req.params.id_rubrik);
  res.json(data);
};

exports.createRubrik = async (req, res) => {
  const data = await Rubrik.create(req.body);
  res.json({ message: "Rubrik created", data });
};

exports.updateRubrik = async (req, res) => {
  const data = await Rubrik.update(req.params.id_rubrik, req.body);
  res.json({ message: "Rubrik updated", data });
};

exports.deleteRubrik = async (req, res) => {
  await Rubrik.remove(req.params.id_rubrik);
  res.json({ message: "Rubrik deleted" });
};