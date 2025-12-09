// const Kelompok = require("../models/kelompokModel");

// exports.getAllKelompok = async (req, res) => {
//   try {
//     const data = await Kelompok.getAll();
//     res.json(data);
//   } catch (error) {
//     console.error("Error getAllKelompok:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getKelompok = async (req, res) => {
//   try {
//     const data = await Kelompok.getById(req.params.id_kelompok);
//     if (!data) {
//       return res.status(404).json({ error: "Kelompok not found" });
//     }
//     res.json(data);
//   } catch (error) {
//     console.error("Error getKelompok:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getKelompokByTubes = async (req, res) => {
//   try {
//     const data = await Kelompok.getByIdTubes(req.params.id_tubes);
//     res.json(data);
//   } catch (error) {
//     console.error("Error getKelompokByTubes:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.generateKelompok = async (req, res) => {
//   try {
//     console.log("Request body:", req.body);
    
//     const data = await Kelompok.generateKelompok(req.body);
    
//     console.log("Kelompok generated:", data);
//     res.json({ message: "Kelompok berhasil dibuat", data });
//   } catch (error) {
//     console.error("Error generateKelompok:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.createKelompok = async (req, res) => {
//   try {
//     const data = await Kelompok.create(req.body);
//     res.json({ message: "Kelompok created", data });
//   } catch (error) {
//     console.error("Error createKelompok:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateKelompok = async (req, res) => {
//   try {
//     const data = await Kelompok.update(req.params.id_kelompok, req.body);
//     res.json({ message: "Kelompok updated", data });
//   } catch (error) {
//     console.error("Error updateKelompok:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteKelompok = async (req, res) => {
//   try {
//     await Kelompok.remove(req.params.id_kelompok);
//     res.json({ message: "Kelompok deleted" });
//   } catch (error) {
//     console.error("Error deleteKelompok:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteKelompokByTubes = async (req, res) => {
//   try {
//     await Kelompok.removeByIdTubes(req.params.id_tubes);
//     res.json({ message: "All kelompok deleted for this tubes" });
//   } catch (error) {
//     console.error("Error deleteKelompokByTubes:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.addAnggota = async (req, res) => {
//   try {
//     console.log("=== ADD ANGGOTA ===");
//     console.log("Request body:", req.body);
    
//     const data = await Kelompok.addAnggota(req.body);
    
//     console.log("Anggota added:", data);
//     res.json({ message: "Anggota berhasil ditambahkan", data });
//   } catch (error) {
//     console.error("Error addAnggota:", error);
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.removeAnggota = async (req, res) => {
//   try {
//     const { npm, id_kelompok } = req.params;
//     await Kelompok.removeAnggota(npm, id_kelompok);
//     res.json({ message: "Anggota removed" });
//   } catch (error) {
//     console.error("Error removeAnggota:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getMahasiswaByKelas = async (req, res) => {
//   try {
//     const data = await Kelompok.getMahasiswaByKelas(req.params.kelas);
//     res.json(data);
//   } catch (error) {
//     console.error("Error getMahasiswaByKelas:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getMahasiswaAvailable = async (req, res) => {
//   try {
//     const { id_tubes, kelas } = req.params;
//     const data = await Kelompok.getMahasiswaAvailable(id_tubes, kelas);
//     res.json(data);
//   } catch (error) {
//     console.error("Error getMahasiswaAvailable:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getMahasiswaInKelompok = async (req, res) => {
//   try {
//     const { id_tubes, kelas } = req.params;
//     const data = await Kelompok.getMahasiswaInKelompok(id_tubes, kelas);
//     res.json(data);
//   } catch (error) {
//     console.error("Error getMahasiswaInKelompok:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.assignMahasiswa = async (req, res) => {
//   try {
//     console.log("=== ASSIGN MAHASISWA ===");
//     console.log("Request body:", req.body);
    
//     const data = await Kelompok.assignMahasiswa(req.body.assignments);
    
//     console.log("Assigned:", data);
//     res.json({ message: "Mahasiswa berhasil di-assign", data });
//   } catch (error) {
//     console.error("Error assignMahasiswa:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

const Kelompok = require("../models/kelompokModel");

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

exports.deleteKelompok = async (req, res) => {
  await Kelompok.remove(req.params.id_kelompok);
  res.json({ message: "Kelompok deleted" });
};

exports.deleteKelompokByTubes = async (req, res) => {
  await Kelompok.removeByIdTubes(req.params.id_tubes);
  res.json({ message: "All kelompok deleted for this tubes" });
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