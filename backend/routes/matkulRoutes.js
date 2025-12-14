const express = require("express");
const router = express.Router();
const matkulController = require("../controllers/matkulController");

router.get("/", matkulController.getAllMatkul);
router.get("/:id_mk_dibuka", matkulController.getMatkul);
//router.get("/:id_mk_dibuka/tubes", matkulController.getTubesByMatkul);

module.exports = router;