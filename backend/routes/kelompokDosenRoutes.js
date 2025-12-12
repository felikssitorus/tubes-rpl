const express = require("express");
const router = express.Router();

const kelompokDosenController = require("../controllers/kelompokDosenController");

router.get("/", kelompokDosenController.getAllKelompok);
router.get("/:id_kelompok", kelompokDosenController.getKelompok);
router.get("/tubes/:id_tubes", kelompokDosenController.getKelompokByTubes);
router.get("/tubes/:id_tubes/lock-status", kelompokDosenController.getLockStatus);
router.post("/generate", kelompokDosenController.generateKelompok);
router.post("/", kelompokDosenController.createKelompok);
router.put("/:id_kelompok", kelompokDosenController.updateKelompok);
router.put("/:id_kelompok/max-anggota", kelompokDosenController.updateMaxAnggota);
router.put("/tubes/:id_tubes/lock", kelompokDosenController.lockTubes);
router.put("/tubes/:id_tubes/unlock", kelompokDosenController.unlockTubes);

router.post("/anggota", kelompokDosenController.addAnggota);
router.delete("/anggota/:npm/:id_kelompok", kelompokDosenController.removeAnggota);

router.get("/mahasiswa/kelas/:kelas", kelompokDosenController.getMahasiswaByKelas);
router.get("/mahasiswa/available/:id_tubes/:kelas", kelompokDosenController.getMahasiswaAvailable);
router.get("/mahasiswa/in-kelompok/:id_tubes/:kelas", kelompokDosenController.getMahasiswaInKelompok);
router.post("/assign", kelompokDosenController.assignMahasiswa);

module.exports = router;