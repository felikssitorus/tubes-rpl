const adminModel = require("../models/adminModel");

// dashboard 
exports.getDashboardStats = async (req, res) => {
    try {
        const stats = await adminModel.getDashboardStats();
        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

// manage mata kuliah 
exports.getMataKuliahAktif = async (req, res) => {
    try {
        const mataKuliah = await adminModel.getMataKuliahAktif();
        res.json(mataKuliah);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

// ============ FUNGSI YANG DI-GANTI ============
exports.createMataKuliah = async (req, res) => {
    const data = req.body;

    console.log("📥 Data diterima di controller:", data);

    if (!data.nama_mata_kuliah || !data.kode_mata_kuliah || !data.semester || !data.tahun_ajaran) {
        return res.status(400).json({
            message: "Semua field wajib diisi"
        });
    }

    try {
        // KONVERSI TAHUN_AJARAN KE INTEGER
        let tahunAjaranValue;

        if (typeof data.tahun_ajaran === 'string') {
            // Jika format "2024/2025", ambil tahun pertama
            if (data.tahun_ajaran.includes('/')) {
                tahunAjaranValue = parseInt(data.tahun_ajaran.split('/')[0]);
                console.log(`🔄 Convert tahun_ajaran: "${data.tahun_ajaran}" → ${tahunAjaranValue}`);
            } else {
                // Jika sudah angka string "2024"
                tahunAjaranValue = parseInt(data.tahun_ajaran);
            }
        } else {
            // Jika sudah number
            tahunAjaranValue = data.tahun_ajaran;
        }

        // Validasi hasil konversi
        if (isNaN(tahunAjaranValue)) {
            return res.status(400).json({
                message: "Tahun ajaran harus angka (contoh: 2024)",
                received: data.tahun_ajaran,
                suggestion: "Kirim 2024 bukan 2024/2025"
            });
        }

        // Konversi semester ke integer
        const semesterValue = parseInt(data.semester) || 1;

        // Data yang sudah dikonversi untuk model
        const processedData = {
            nama_mata_kuliah: data.nama_mata_kuliah,
            kode_mata_kuliah: data.kode_mata_kuliah,
            semester: semesterValue,
            tahun_ajaran: tahunAjaranValue, // INTEGER!
            kelas: data.kelas || 'A',
            sks: data.sks || 3
        };

        console.log("🔄 Data setelah konversi:", processedData);

        const newMataKuliah = await adminModel.createMataKuliahDibuka(processedData);

        res.status(201).json({
            message: "Mata kuliah berhasil ditambahkan",
            data: newMataKuliah
        });

    } catch (error) {
        console.error("❌ Error createMataKuliah:", error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message,
            detail: `Database mengharapkan tahun_ajaran sebagai integer, diterima: ${data.tahun_ajaran}`
        });
    }
};
// ============ END FUNGSI YANG DI-GANTI ============

exports.getDetailMataKuliah = async (req, res) => {
    const { id } = req.params;

    try {
        const detail = await adminModel.getDetailMataKuliah(id);
        if (!detail) {
            return res.status(404).json({ message: "Mata kuliah tidak ditemukan" });
        }
        res.json(detail);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

exports.deleteMataKuliah = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await adminModel.deleteMataKuliahDibuka(id);
        res.json({
            message: "Mata kuliah berhasil dihapus",
            data: deleted
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

// manage dosen 
exports.getAllDosenAktif = async (req, res) => {
    try {
        const dosen = await adminModel.getAllDosenAktif();
        res.json(dosen);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

exports.addDosenToMataKuliah = async (req, res) => {
    const { id_mk_dibuka } = req.params;
    const { nik_dosen } = req.body;

    if (!nik_dosen) {
        return res.status(400).json({
            message: "NIK dosen wajib diisi"
        });
    }

    try {
        const result = await adminModel.addDosenToMataKuliah(id_mk_dibuka, nik_dosen);
        res.status(201).json({
            message: "Dosen berhasil ditambahkan ke mata kuliah",
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

// manage mahasiswa 
exports.getAllMahasiswaAktif = async (req, res) => {
    try {
        const mahasiswa = await adminModel.getAllMahasiswaAktif();
        res.json(mahasiswa);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

exports.addMahasiswaToMataKuliah = async (req, res) => {
    const { id_mk_dibuka } = req.params;
    const { npm_mahasiswa } = req.body;

    if (!npm_mahasiswa) {
        return res.status(400).json({
            message: "NPM mahasiswa wajib diisi"
        });
    }

    try {
        const result = await adminModel.addMahasiswaToMataKuliah(id_mk_dibuka, npm_mahasiswa);
        res.status(201).json({
            message: "Mahasiswa berhasil ditambahkan ke mata kuliah",
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

// anggota kelas
exports.getAnggotaKelas = async (req, res) => {
    const { id } = req.params;

    try {
        const anggota = await adminModel.getAnggotaKelas(id);
        res.json(anggota);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

// manage user
exports.getAllUsers = async (req, res) => {
    try {
        const users = await adminModel.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

exports.getUserById = async (req, res) => {
    const { id, role } = req.params;

    if (!['mahasiswa', 'dosen'].includes(role)) {
        return res.status(400).json({ message: "Role harus 'mahasiswa' atau 'dosen'" });
    }

    try {
        const user = await adminModel.getUserById(id, role);
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

exports.updateUser = async (req, res) => {
    const { id, role } = req.params;
    const userData = req.body;

    if (!['mahasiswa', 'dosen'].includes(role)) {
        return res.status(400).json({ message: "Role harus 'mahasiswa' atau 'dosen'" });
    }

    try {
        const updatedUser = await adminModel.updateUser(id, role, userData);
        res.json({
            message: "User berhasil diupdate",
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    const { id, role } = req.params;

    if (!['mahasiswa', 'dosen'].includes(role)) {
        return res.status(400).json({ message: "Role harus 'mahasiswa' atau 'dosen'" });
    }

    try {
        await adminModel.deleteUser(id, role);
        res.json({ message: "User berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

exports.createUser = async (req, res) => {
    const userData = req.body;

    if (!userData.role || !userData.email) {
        return res.status(400).json({
            message: "Role dan email wajib diisi"
        });
    }

    if (!['mahasiswa', 'dosen'].includes(userData.role)) {
        return res.status(400).json({
            message: "Role harus 'mahasiswa' atau 'dosen'"
        });
    }

    try {
        const newUser = await adminModel.createUser(userData);
        res.status(201).json({
            message: "User berhasil dibuat",
            user: newUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

// manage tugas besar
exports.getAllTubes = async (req, res) => {
    try {
        const tubes = await adminModel.getAllTubes();
        res.json(tubes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

exports.toggleTubeLock = async (req, res) => {
    const { id } = req.params;
    const { is_locked } = req.body;

    if (typeof is_locked !== 'boolean') {
        return res.status(400).json({ message: "is_locked harus boolean" });
    }

    try {
        const updatedTube = await adminModel.toggleTubeLock(id, is_locked);
        res.json({
            message: is_locked ? "Tube terkunci" : "Tube terbuka",
            tube: updatedTube
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};

// manage kelompok
exports.getAllKelompok = async (req, res) => {
    try {
        const kelompok = await adminModel.getAllKelompok();
        res.json(kelompok);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message
        });
    }
};