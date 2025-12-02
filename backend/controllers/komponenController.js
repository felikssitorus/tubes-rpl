const Komponen = require("../models/komponenModel");

exports.getAllKomponen = async (req, res) => {
  const data = await Komponen.getAll();
  res.json(data);
};

exports.getKomponen = async (req, res) => {
  const data = await Komponen.getById(req.params.id_komponen);
  res.json(data);
};

exports.createKomponen = async (req, res) => {
  const data = await Komponen.create(req.body);
  res.json({ message: "Komponen created", data });
};

exports.updateKomponen = async (req, res) => {
  const data = await Komponen.update(req.params.id_komponen, req.body);
  res.json({ message: "Komponen updated", data });
};

exports.deleteKomponen = async (req, res) => {
  await Komponen.remove(req.params.id_komponen);
  res.json({ message: "Komponen deleted" });
};
