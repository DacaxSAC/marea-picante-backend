const { Client } = require('../models/client.model');

const services = {}

services.create = async (clientData) => {
  return await Client.create(clientData);
};

services.getAll = async () => {
  return await Client.findAll();
};

services.getById = async (clientId) => {
  return await Client.findByPk(clientId);
};

services.update = async (clientId, clientData) => {
  return await Client.update(clientData, { where: { id: clientId } });
};

services.delete = async (clientId) => {
  return await Client.destroy({ where: { id: clientId } });
};

module.exports = { ClientService: services }