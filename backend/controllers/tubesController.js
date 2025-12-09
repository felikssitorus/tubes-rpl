const pool = require("../config/db");

// Ambil semua topik tugas besar untuk idMkDibuka tertentu
const getTubesByMkDibukaController = async (req, res) => {
  const { idMkDibuka } = req.params;
  try {
    const query = `
      SELECT id_tubes, topik_tubes
      FROM tugas_besar
      WHERE id_mk_dibuka = $1
      ORDER BY id_tubes
    `;
    const { rows } = await pool.query(query, [idMkDibuka]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Tidak ada topik tugas besar ditemukan" });
    }
    res.json({ message: "Topik tugas besar ditemukan", tubes: rows });
  } catch (err) {
    console.error("Error getTubesByMkDibukaController:", err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

module.exports = { getTubesByMkDibukaController };
