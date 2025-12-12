const express = require("express");
const router = express.Router();
const mahasiswaController = require("../controllers/mahasiswaController");

// GET mahasiswa berdasarkan email
router.get("/:email", mahasiswaController.getMahasiswaByEmail);

// GET semua mahasiswa
router.get("/", mahasiswaController.getAllMahasiswa);

module.exports = router;
