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

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

const mkDiambilRoutes = require("./routes/mkDiambilRoutes");
app.use("/mk-diambil", mkDiambilRoutes);

const mengajarRoutes = require("./routes/mengajarRoutes");
app.use("/mengajar", mengajarRoutes);

const kelompokRoutes = require("./routes/kelompokRoutes");
app.use("/kelompok", kelompokRoutes);

// Tambahkan routes mahasiswa
const mahasiswaRoutes = require("./routes/mahasiswaRoutes");
app.use("/mahasiswa", mahasiswaRoutes);  // <- endpoint: /mahasiswa atau /mahasiswa/:email

// Tambahkan routes tubes
const tubesRoutes = require("./routes/tubesRoutes");
app.use("/tubes", tubesRoutes);

// Tambahkan routes nilai mahasiswa
const nilaiMhsRoutes = require("./routes/nilaiRoutes");
app.use("/nilai-mhs", nilaiMhsRoutes); // endpoint: /nilai-mhs/:npm

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});