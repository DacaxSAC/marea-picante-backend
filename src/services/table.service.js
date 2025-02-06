const { Table } = require('../models/table.model');

const services = {}

services.create = async (tableData) => {
  return await Table.create(tableData);
};

services.getAll = async () => {
  return await Table.findAll();
};

services.getById = async (tableId) => {
  return await Table.findByPk(tableId);
};

services.update = async (tableId, tableData) => {
  return await Table.update(tableData, { where: { id: tableId } });
};

services.delete = async (tableId) => {
  return await Table.destroy({ where: { id: tableId } });
};

module.exports = { TableService: services }