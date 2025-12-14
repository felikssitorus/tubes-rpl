const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.json({ message: "Backend berjalan!" });
});

// Routes untuk mahasiswa
app.use("/user", require("./routes/userRoutes"));
app.use("/mk-diambil", require("./routes/mkDiambilRoutes"));
app.use("/mahasiswa", require("./routes/mahasiswaRoutes"));
app.use("/kelompok", require("./routes/kelompokRoutes"));
app.use("/nilai-mhs", require("./routes/nilaiRoutes"));
app.use("/tubes", require("./routes/tubesRoutes"));

// Routes untuk dosen
app.use("/api/mengajar", require("./routes/mengajarRoutes"));
app.use("/api/komponen", require("./routes/komponenRoutes"));
app.use("/api/kelompok-dosen", require("./routes/kelompokDosenRoutes"));
app.use("/api/matkul", require("./routes/matkulRoutes"));
app.use("/api/tubes-dosen", require("./routes/tubesDosenRoutes")); // route untuk tubes dosen

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});