// File: backend/routes/kelompokRoutes.js
const express = require("express");
const {
  fetchKelompokByTubes,
  fetchKelompokMahasiswa,
  postJoinKelompok
} = require("../controllers/kelompokController");

const router = express.Router();

// route untuk semua topik tubes
router.get("/tubes/:idTubes", fetchKelompokByTubes);
router.get("/tubes/:idTubes/mahasiswa/:npm", fetchKelompokMahasiswa);

// join kelompok
router.post("/join", postJoinKelompok);

module.exports = router;
