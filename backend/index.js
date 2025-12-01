const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend Express berjalan!" });
});

// Route
// const tasksRoute = require("./routes/tasks");
// app.use("/tasks", tasksRoute);

const employeeRoutes = require("./routes/employeeRoutes");
app.use("/employees", employeeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
