const express = require("express");
const router = express.Router();

const tubesController = require("../controllers/tubesDosenController");

router.get("/", tubesController.getAllTubes);
router.get("/:id_tubes", tubesController.getTubes);
router.post("/", tubesController.createTubes);
router.put("/:id_tubes", tubesController.updateTubes);
router.delete("/:id_tubes", tubesController.deleteTubes);

module.exports = router;