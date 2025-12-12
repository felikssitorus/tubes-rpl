const express = require("express");
const router = express.Router();
const { getTubesByMkDibukaController } = require("../controllers/tubesController");

// GET semua topik tugas besar untuk idMkDibuka tertentu
router.get("/mk/:idMkDibuka", getTubesByMkDibukaController);

module.exports = router;
