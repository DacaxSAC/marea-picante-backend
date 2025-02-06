const { EmployeeService } = require("../services/employee.service");
const Joi = require("joi");

const controllers = {}

const employeeSchema = Joi.object({
    employeeId: Joi.number().integer().positive(),
    dni: Joi.string().max(255).required(),
    names: Joi.string().max(255).required(),
    surnames: Joi.string().max(255).required(),
    cellphone: Joi.string().max(255).required(),
    email: Joi.string().max(255),
    state: Joi.number().integer().positive()
});

controllers.create = async (req, res) => {
  const { error } = employeeSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const employee = await EmployeeService.create(req.body);
    res.status(201).send(employee);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getAll = async (req, res) => {
  try {
    const employees = await EmployeeService.getAll();
    res.send(employees);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getById = async (req, res) => {
  try {
    const employee = await EmployeeService.getById(req.params.id);
    if (!employee) return res.status(404).send("Empleado no encontrado");
    res.send(employee);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.update = async (req, res) => {
  const { error } = employeeSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updated = await EmployeeService.update(
      req.params.id,
      req.body
    );
    if (updated[0] === 0)
      return res.status(404).send("Empleado no encontrado");
    res.send("Empleado actualizado exitosamente");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.delete = async (req, res) => {
  try {
    const deleted = await EmployeeService.delete(req.params.id);
    if (deleted === 0) return res.status(404).send("Empleado no encontrado");
    res.send("Empleado eliminado exitosamente");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { EmployeeController: controllers }