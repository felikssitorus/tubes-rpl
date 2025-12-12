const express = require("express");
const router = express.Router();

const tubesController = require("../controllers/tubesController");

router.get("/", tubesController.getAllTubes);
router.get("/:id_tubes", tubesController.getTubes);
router.get("/matakuliah/:id_mk_dibuka", tubesController.getTubesByMataKuliah);
router.post("/", tubesController.createTubes);
router.put("/:id_tubes", tubesController.updateTubes);
router.delete("/:id_tubes", tubesController.deleteTubes);

// GET semua topik tugas besar untuk idMkDibuka tertentu
router.get("/mk/:idMkDibuka", tubesController.getTubesByMkDibukaController);

module.exports = router;
