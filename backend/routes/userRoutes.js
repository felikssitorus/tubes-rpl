const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//route login
router.post("/login", userController.login);
// get semua user (testing/debug)
router.get("/", userController.getAllUsers);
module.exports = router;