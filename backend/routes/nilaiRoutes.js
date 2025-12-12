const express = require("express");
const router = express.Router();

const { 
  getNilaiMahasiswa,
  getTubesList,
  getNilaiByTubes
} = require("../controllers/nilaiController");

// GET daftar tubes mahasiswa (optional filter idMk via query)
router.get("/tubes/:npm", getTubesList);

// GET nilai per tubes
router.get("/:npm/tubes/:idTubes", getNilaiByTubes);

// GET nilai lengkap mahasiswa
router.get("/:npm", getNilaiMahasiswa);

module.exports = router;
