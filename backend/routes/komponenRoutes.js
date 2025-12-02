const express = require("express");
const router = express.Router();

const komponenController = require("../controllers/komponenController");
router.get("/", komponenController.getAllKomponen);
router.get("/:id_komponen", komponenController.getKomponen);
router.post("/", komponenController.createKomponen);
router.put("/:id_komponen", komponenController.updateKomponen);
router.delete("/:id_komponen", komponenController.deleteKomponen);

module.exports = router;
