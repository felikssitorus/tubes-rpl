const User = require("../models/userModel");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email dan password wajib diisi" });

  try {
    const user = await User.getByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    res.json({
      message: "Login berhasil",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
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
