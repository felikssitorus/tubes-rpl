const express = require("express");
const {
  getTubesByMk,
  fetchKelompokByTubes,
  fetchKelompokMahasiswa,
  postJoinKelompok
} = require("../controllers/kelompokController");

const router = express.Router();

// GET daftar topik tugas besar per MK
router.get("/mk/:idMkDibuka", getTubesByMk);

// GET kelompok per tubes
router.get("/tubes/:idTubes", fetchKelompokByTubes);

// GET kelompok mahasiswa per tubes
router.get("/tubes/:idTubes/mahasiswa/:npm", fetchKelompokMahasiswa);

// POST join kelompok
router.post("/join", postJoinKelompok);

module.exports = router;
