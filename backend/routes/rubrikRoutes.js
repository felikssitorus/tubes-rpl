const express = require("express");
const router = express.Router();

const rubrikController = require("../controllers/rubrikController");
router.get("/", rubrikController.getAllRubrik);
router.get("/:id_rubrik", rubrikController.getRubrik);
router.post("/", rubrikController.createRubrik);
router.put("/:id_rubrik", rubrikController.updateRubrik);
router.delete("/:id_rubrik", rubrikController.deleteRubrik);

module.exports = router;