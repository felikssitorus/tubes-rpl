const express = require("express");
const router = express.Router();
const { getNilaiMahasiswa } = require("../controllers/nilaiController");

// GET nilai mahasiswa berdasarkan NPM
router.get("/:npm", getNilaiMahasiswa);

module.exports = router;