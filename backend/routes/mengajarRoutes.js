// src/routes/mengajarRoutes.js
const express = require("express");
const router = express.Router();
const mengajarController = require("../controllers/mengajarController");

// GET semua pengajar beserta mata kuliah
router.get("/", mengajarController.getAllMengajar);

// GET pengajar berdasarkan id_mk_dibuka
router.get("/:id_mk_dibuka", mengajarController.getPengajarPerMkDibuka);

module.exports = router;
