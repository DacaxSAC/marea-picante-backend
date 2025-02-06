const { Employee } = require('../models/employee.model');

const services = {}

services.create = async (employeeData) => {
  return await Employee.create(employeeData);
};

services.getAll = async () => {
  return await Employee.findAll();
};

services.getById = async (employeeId) => {
  return await Employee.findByPk(employeeId);
};

services.update = async (employeeId, employeeData) => {
  return await Employee.update(employeeData, { where: { id: employeeId } });
};

services.delete = async (employeeId) => {
  return await Employee.destroy({ where: { id: employeeId } });
};

module.exports = { EmployeeService: services }