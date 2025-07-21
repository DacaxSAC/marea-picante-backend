const { Op } = require('sequelize');
const { Table } = require('../models/table.model');

const services = {}

services.create = async (tableData) => {
  return await Table.create(tableData);
};

services.getAll = async () => {
  return await Table.findAll({
    where: {
      state: {
        [Op.ne]: 0
      }
    },
    order: [['number', 'ASC']]
  });
};

services.getById = async (tableId) => {
  return await Table.findAll({
    where: {
      tableId,
      state: {
        [Op.ne]: 0
      }
    }
  });
};

services.update = async (tableId, tableData) => {
  return await Table.update(tableData, {
    where: {
      tableId,
      state: {
        [Op.ne]: 0
      }
    }
  });
};

services.delete = async (tableId) => {
  return await Table.update({ state: 0 }, {
    where: {
      tableId,
      state: {
        [Op.ne]: 0
      }
    }
  });
};

module.exports = { TableService: services }