const Employee = require("../models/employeeModel");

exports.getEmployees = async (req, res) => {
  const data = await Employee.getAll();
  res.json(data);
};

exports.getEmployee = async (req, res) => {
  const data = await Employee.getById(req.params.id);
  res.json(data);
};

exports.createEmployee = async (req, res) => {
  const data = await Employee.create(req.body);
  res.json({ message: "Employee created", data });
};

exports.updateEmployee = async (req, res) => {
  const data = await Employee.update(req.params.id, req.body);
  res.json({ message: "Employee updated", data });
};

exports.deleteEmployee = async (req, res) => {
  await Employee.remove(req.params.id);
  res.json({ message: "Employee deleted" });
};
