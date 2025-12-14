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
  try {
    const { id_tubes, bobot_komponen } = req.body;
    const existingTotal = await Komponen.getTotalBobot(id_tubes);
    const newTotal = existingTotal + parseFloat(bobot_komponen);
    
    if (newTotal > 100) {
      return res.status(400).json({ 
        error: `Total bobot melebihi 100%. Total saat ini: ${existingTotal}%, mencoba tambah: ${bobot_komponen}%. Total akan jadi: ${newTotal}%` 
      });
    }
    
    const data = await Komponen.create(req.body);
    res.json({ message: "Komponen created", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateKomponen = async (req, res) => {
  try {
    const { id_komponen } = req.params;
    const { bobot_komponen, id_tubes } = req.body;
    const oldKomponen = await Komponen.getById(id_komponen);
    if (!oldKomponen) {
      return res.status(404).json({ error: "Komponen tidak ditemukan" });
    }
    
    const tubesId = id_tubes || oldKomponen.id_tubes;
    const existingTotal = await Komponen.getTotalBobot(tubesId);
    const newTotal = existingTotal - parseFloat(oldKomponen.bobot_komponen) + parseFloat(bobot_komponen);
    
    if (newTotal > 100) {
      return res.status(400).json({ 
        error: `Total bobot melebihi 100%. Total saat ini (tanpa komponen ini): ${existingTotal - oldKomponen.bobot_komponen}%, mencoba ubah jadi: ${bobot_komponen}%. Total akan jadi: ${newTotal}%` 
      });
    }
    
    const data = await Komponen.update(id_komponen, req.body);
    res.json({ message: "Komponen updated", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteKomponen = async (req, res) => {
  await Komponen.remove(req.params.id_komponen);
  res.json({ message: "Komponen deleted" });
};