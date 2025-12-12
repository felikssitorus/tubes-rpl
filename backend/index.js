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
app.use("/user", require("./routes/userRoutes"));
app.use("/mk-diambil", require("./routes/mkDiambilRoutes"));
app.use("/mengajar", require("./routes/mengajarRoutes"));
app.use("/kelompok", require("./routes/kelompokRoutes"));
app.use("/mahasiswa", require("./routes/mahasiswaRoutes"));
app.use("/tubes", require("./routes/tubesRoutes"));
app.use("/nilai-mhs", require("./routes/nilaiRoutes"));

// Tambahkan routes nilai mahasiswa
const nilaiMhsRoutes = require("./routes/nilaiRoutes");
app.use("/nilai-mhs", nilaiMhsRoutes); // endpoint: /nilai-mhs/:npm
// Tambahkan routes tubes
const tubesRoutes = require("./routes/tubesRoutes");
app.use("/tubes", tubesRoutes);

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
