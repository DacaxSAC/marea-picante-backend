const { Product } = require('../models/product.model');

const services = {}

services.create = async (productData) => {
  return await Product.create(productData);
};

services.getAll = async () => {
  return await Product.findAll();
};

services.getById = async (productId) => {
  return await Product.findByPk(productId);
};

services.update = async (productId, productData) => {
  return await Product.update(productData, { where: { id: productId } });
};

services.delete = async (productId) => {
  return await Product.destroy({ where: { id: productId } });
};

module.exports = { ProductService: services }