const express = require("express");
const router = express.Router();
const MkDiambilController = require("../controllers/mkDiambilController");

// GET mata kuliah yang diambil berdasarkan email user
router.get("/:email", MkDiambilController.getMkDiambilByEmail);

module.exports = router;
