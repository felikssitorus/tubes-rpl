const express = require("express");
const router = express.Router();
const matkulController = require("../controllers/matkulController");

// Pastikan function-nya ada di controller
router.get("/", matkulController.getAllMatkul);
router.get("/:id_matkul", matkulController.getMatkul);

module.exports = router;