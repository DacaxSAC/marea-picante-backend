const { Role } = require('../models/role.model');
const { Op } = require('sequelize');

const services = {};

services.create = async (roleData) => {
  roleData.state = 1;
  return await Role.create(roleData);
};

services.getAll = async () => {
  return await Role.findAll({ 
    where: { 
      state: {
        [Op.ne]: 0 
      } 
    } 
  });
};

services.getById = async (roleId) => {
  return await Role.findAll({ 
    where: { 
      roleId,
      state: {
        [Op.ne]: 0 
      } 
    } 
  });
};

services.update = async (roleId, roleData) => {
  return await Role.update(roleData, { where: { roleId } });
};

services.delete = async (roleId) => {
  return await Role.update({ state: 0 }, { where: { roleId } });
};

module.exports = { RoleService: services };