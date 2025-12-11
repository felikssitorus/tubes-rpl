const express = require("express");
const {
  fetchKelompokByTubes,
  fetchKelompokMahasiswa,
  postJoinKelompok,
  fetchTubesByMk
} = require("../controllers/kelompokController");

const router = express.Router();

// Tambahkan prefix /tubes agar sesuai frontend
router.get("/tubes/:idTubes", fetchKelompokByTubes);
router.get("/tubes/:idTubes/mahasiswa/:npm", fetchKelompokMahasiswa);

// Join kelompok
router.post("/join", postJoinKelompok);

// Ambil topik tubes berdasarkan MK
router.get("/mk/:idMkDibuka", fetchTubesByMk);

module.exports = router;
