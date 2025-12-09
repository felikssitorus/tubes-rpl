// // const Rubrik = require("../models/rubrikModel");

// // exports.getAllRubrik = async (req, res) => {
// //   const data = await Rubrik.getAll();
// //   res.json(data);
// // };

// // exports.getRubrik = async (req, res) => {
// //   const data = await Rubrik.getById(req.params.id_rubrik);
// //   res.json(data);
// // };

// // exports.createRubrik = async (req, res) => {
// //   const data = await Rubrik.create(req.body);
// //   res.json({ message: "Rubrik created", data });
// // };

// // exports.updateRubrik = async (req, res) => {
// //   const data = await Rubrik.update(req.params.id_rubrik, req.body);
// //   res.json({ message: "Rubrik updated", data });
// // };

// // exports.deleteRubrik = async (req, res) => {
// //   await Rubrik.remove(req.params.id_rubrik);
// //   res.json({ message: "Rubrik deleted" });
// //};

// const Rubrik = require("../models/rubrikModel");

// exports.getAllRubrik = async (req, res) => {
//   try {
//     const data = await Rubrik.getAll();
//     res.json(data);
//   } catch (error) {
//     console.error("Error getAllRubrik:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getRubrik = async (req, res) => {
//   try {
//     const data = await Rubrik.getById(req.params.id_rubrik);
//     res.json(data);
//   } catch (error) {
//     console.error("Error getRubrik:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.createRubrik = async (req, res) => {
//   try {
//     console.log("Request body:", req.body);
//     const data = await Rubrik.create(req.body);
//     console.log("Data created:", data);
//     res.json({ message: "Rubrik created", data });
//   } catch (error) {
//     console.error("Error createRubrik:", error);
//     console.error("Error stack:", error.stack);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateRubrik = async (req, res) => {
//   try {
//     const data = await Rubrik.update(req.params.id_rubrik, req.body);
//     res.json({ message: "Rubrik updated", data });
//   } catch (error) {
//     console.error("Error updateRubrik:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteRubrik = async (req, res) => {
//   try {
//     await Rubrik.remove(req.params.id_rubrik);
//     res.json({ message: "Rubrik deleted" });
//   } catch (error) {
//     console.error("Error deleteRubrik:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
const Rubrik = require("../models/rubrikModel");

exports.getAllRubrik = async (req, res) => {
  const data = await Rubrik.getAll();
  res.json(data);
};

exports.getRubrik = async (req, res) => {
  const data = await Rubrik.getById(req.params.id_rubrik);
  res.json(data);
};

exports.createRubrik = async (req, res) => {
  const data = await Rubrik.create(req.body);
  res.json({ message: "Rubrik created", data });
};

exports.updateRubrik = async (req, res) => {
  const data = await Rubrik.update(req.params.id_rubrik, req.body);
  res.json({ message: "Rubrik updated", data });
};

exports.deleteRubrik = async (req, res) => {
  await Rubrik.remove(req.params.id_rubrik);
  res.json({ message: "Rubrik deleted" });
};