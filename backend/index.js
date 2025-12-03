const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.json({ message: "Backend Express berjalan!" });
});

// Routes fitur lain
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/employees", employeeRoutes);

const komponenRoutes = require("./routes/komponenRoutes");
app.use("/komponen", komponenRoutes);

// Route login
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});