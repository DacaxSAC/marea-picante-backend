const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const services = {};

services.create = async (userData) => {
  // Encriptar la contraseña antes de guardarla
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);
  
  return await User.create(userData);
};

services.getAll = async () => {
  return await User.findAll({
    attributes: { exclude: ['password'] } // No devolver la contraseña
  });
};

services.getById = async (userId) => {
  return await User.findByPk(userId, {
    attributes: { exclude: ['password'] } // No devolver la contraseña
  });
};

services.update = async (userId, userData) => {
  // Si se incluye una nueva contraseña, encriptarla
  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
  }
  
  return await User.update(userData, { where: { userId: userId } });
};

services.delete = async (userId) => {
  return await User.destroy({ where: { userId: userId } });
};

module.exports = { UserService: services };