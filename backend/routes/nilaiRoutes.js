const express = require("express");
const router = express.Router();

const nilaiController = require("../controllers/nilaiController");

router.get("/komponen/:id_komponen", nilaiController.getNilaiByKomponen);
router.get("/kelompok/:id_kelompok/komponen/:id_komponen", nilaiController.getNilaiByKelompokKomponen);
router.get("/anggota/:id_kelompok", nilaiController.getAnggotaKelompok);
router.post("/", nilaiController.saveNilai);
router.delete("/:npm/:id_komponen", nilaiController.deleteNilai);

module.exports = router;