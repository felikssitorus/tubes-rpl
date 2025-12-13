const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// UNTUK SEKARANG: Tanpa middleware dulu
// const { authenticate, authorizeAdmin } = require("../middlewares/auth");
// router.use(authenticate);
// router.use(authorizeAdmin);

// ============ DASHBOARD ROUTES ============
router.get("/dashboard/stats", adminController.getDashboardStats);

// ============ MATA KULIAH ROUTES ============
router.get("/mata-kuliah/aktif", adminController.getMataKuliahAktif);
router.post("/mata-kuliah", adminController.createMataKuliah);
router.get("/mata-kuliah/:id", adminController.getDetailMataKuliah);
router.delete("/mata-kuliah/:id", adminController.deleteMataKuliah);
router.get("/mata-kuliah/:id/anggota", adminController.getAnggotaKelas);

// ============ DOSEN ROUTES ============
router.get("/dosen/aktif", adminController.getAllDosenAktif);
router.post("/mata-kuliah/:id_mk_dibuka/dosen", adminController.addDosenToMataKuliah);

// ============ MAHASISWA ROUTES ============
router.get("/mahasiswa/aktif", adminController.getAllMahasiswaAktif);
router.post("/mata-kuliah/:id_mk_dibuka/mahasiswa", adminController.addMahasiswaToMataKuliah);

// ============ USER MANAGEMENT ROUTES ============
router.get("/users", adminController.getAllUsers);
router.get("/users/:role/:id", adminController.getUserById);
router.put("/users/:role/:id", adminController.updateUser);
router.delete("/users/:role/:id", adminController.deleteUser);
router.post("/users", adminController.createUser);

// ============ TUBES ROUTES ============
router.get("/tubes", adminController.getAllTubes);
router.put("/tubes/:id/lock", adminController.toggleTubeLock);

// ============ KELOMPOK ROUTES ============
router.get("/kelompok", adminController.getAllKelompok);

// ============ TEST ROUTE ============
router.get("/test", (req, res) => {
  res.json({ message: "Admin API is working!" });
});

module.exports = router;