const Kelompok = require("../models/kelompokDosenModel");

exports.getAllKelompok = async (req, res) => {
  const data = await Kelompok.getAll();
  res.json(data);
};

exports.getKelompok = async (req, res) => {
  const data = await Kelompok.getById(req.params.id_kelompok);
  if (!data) {
    return res.status(404).json({ error: "Kelompok not found" });
  }
  res.json(data);
};

exports.getKelompokByTubes = async (req, res) => {
  const data = await Kelompok.getByIdTubes(req.params.id_tubes);
  res.json(data);
};

exports.generateKelompok = async (req, res) => {
  const data = await Kelompok.generateKelompok(req.body);
  res.json({ message: "Kelompok berhasil dibuat", data });
};

exports.createKelompok = async (req, res) => {
  const data = await Kelompok.create(req.body);
  res.json({ message: "Kelompok created", data });
};

exports.updateKelompok = async (req, res) => {
  const data = await Kelompok.update(req.params.id_kelompok, req.body);
  res.json({ message: "Kelompok updated", data });
};

exports.addAnggota = async (req, res) => {
  const data = await Kelompok.addAnggota(req.body);
  res.json({ message: "Anggota berhasil ditambahkan", data });
};

exports.removeAnggota = async (req, res) => {
  const { npm, id_kelompok } = req.params;
  await Kelompok.removeAnggota(npm, id_kelompok);
  res.json({ message: "Anggota removed" });
};

exports.getMahasiswaByKelas = async (req, res) => {
  const data = await Kelompok.getMahasiswaByKelas(req.params.kelas);
  res.json(data);
};

exports.getMahasiswaAvailable = async (req, res) => {
  const { id_tubes, kelas } = req.params;
  const data = await Kelompok.getMahasiswaAvailable(id_tubes, kelas);
  res.json(data);
};

exports.getMahasiswaInKelompok = async (req, res) => {
  const { id_tubes, kelas } = req.params;
  const data = await Kelompok.getMahasiswaInKelompok(id_tubes, kelas);
  res.json(data);
};

exports.assignMahasiswa = async (req, res) => {
  const data = await Kelompok.assignMahasiswa(req.body.assignments);
  res.json({ message: "Mahasiswa berhasil di-assign", data });
};

exports.updateMaxAnggota = async (req, res) => {
  const { id_kelompok } = req.params;
  const { max_anggota } = req.body;
  const data = await Kelompok.updateMaxAnggota(id_kelompok, max_anggota);
  res.json({ message: "Max anggota updated", data });
};

exports.getLockStatus = async (req, res) => {
  const { id_tubes } = req.params;
  const data = await Kelompok.getLockStatus(id_tubes);
  res.json(data);
};

exports.lockTubes = async (req, res) => {
  const { id_tubes } = req.params;
  const data = await Kelompok.lockTubes(id_tubes);
  res.json({ message: "Tubes berhasil dikunci", data });
};

exports.unlockTubes = async (req, res) => {
  const { id_tubes } = req.params;
  const data = await Kelompok.unlockTubes(id_tubes);
  res.json({ message: "Tubes berhasil dibuka", data });
};