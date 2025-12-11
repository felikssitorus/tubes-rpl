const express = require("express");
const {
  getTubesByMk,
  fetchKelompokByTubes,
  fetchKelompokMahasiswa,
  postJoinKelompok
} = require("../controllers/kelompokController");

const router = express.Router();

// Semua route langsung memanggil controller
router.get("/mk/:idMkDibuka", getTubesByMk);
router.get("/tubes/:idTubes", fetchKelompokByTubes);
router.get("/tubes/:idTubes/mahasiswa/:npm", fetchKelompokMahasiswa);
router.post("/join", postJoinKelompok);

module.exports = router;
