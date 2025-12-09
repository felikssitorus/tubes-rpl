const express = require("express");
const { fetchKelompok, fetchKelompokMahasiswa, postJoinKelompok } = require("../controllers/kelompokController");
const router = express.Router();

// OPTIONAL: jika user akses /kelompok tanpa idMkDibuka
router.get("/", async (req, res) => {
  res.status(400).json({ message: "Harap sertakan idMkDibuka: /kelompok/:idMkDibuka" });
});

// GET semua kelompok + anggota untuk mata kuliah
router.get("/:idMkDibuka", fetchKelompok);

// GET kelompok mahasiswa tertentu
router.get("/:idMkDibuka/mahasiswa/:npm", fetchKelompokMahasiswa);

// POST join kelompok
router.post("/join", postJoinKelompok);


module.exports = router;
