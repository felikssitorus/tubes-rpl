const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.json({ message: "Backend berjalan!" });
});

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

// ROUTES BARU: MK DIAMBIL
const mkDiambilRoutes = require("./routes/mkDiambilRoutes");
app.use("/mk-diambil", mkDiambilRoutes);

// ROUTES BARU: MENGAJAR
const mengajarRoutes = require("./routes/mengajarRoutes");
app.use("/mengajar", mengajarRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
