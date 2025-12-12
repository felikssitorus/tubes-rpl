const express = require("express");
const router = express.Router();

const { 
  getNilaiMahasiswa,
  getTubesList,
  getNilaiByTubes
} = require("../controllers/nilaiController");

// GET list tubes yang punya nilai
router.get("/tubes/:npm", getTubesList);

// GET nilai per tubes
router.get("/:npm/tubes/:idTubes", getNilaiByTubes);

// GET nilai lengkap (lama)
router.get("/:npm", getNilaiMahasiswa);

module.exports = router;
