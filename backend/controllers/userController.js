const User = require("../models/userModel");
const Mahasiswa = require("../models/mahasiswaModel"); // pastikan ada model mahasiswa

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email dan password wajib diisi" });

  try {
    // Ambil user dari tabel users
    const user = await User.getByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Jika role mahasiswa, ambil data mahasiswa untuk npm
    let mahasiswa = null;
    if (user.role === "mahasiswa") {
      mahasiswa = await Mahasiswa.getByEmail(email);
    }

    res.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        npm: mahasiswa?.npm || null, // kalau bukan mahasiswa tetap null
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// GET semua user (untuk testing)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
