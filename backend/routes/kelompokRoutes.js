const express = require("express");
const router = express.Router();

const kelompokController = require("../controllers/kelompokController");

router.get("/", kelompokController.getAllKelompok);
router.get("/:id_kelompok", kelompokController.getKelompok);
router.get("/tubes/:id_tubes", kelompokController.getKelompokByTubes);
router.post("/generate", kelompokController.generateKelompok);
router.post("/", kelompokController.createKelompok);
router.put("/:id_kelompok", kelompokController.updateKelompok);
router.delete("/:id_kelompok", kelompokController.deleteKelompok);
router.delete("/tubes/:id_tubes", kelompokController.deleteKelompokByTubes);

router.post("/anggota", kelompokController.addAnggota);
router.delete("/anggota/:npm/:id_kelompok", kelompokController.removeAnggota);

router.get("/mahasiswa/kelas/:kelas", kelompokController.getMahasiswaByKelas);
router.get("/mahasiswa/available/:id_tubes/:kelas", kelompokController.getMahasiswaAvailable);
router.get("/mahasiswa/in-kelompok/:id_tubes/:kelas", kelompokController.getMahasiswaInKelompok);
router.post("/assign", kelompokController.assignMahasiswa);

module.exports = router;