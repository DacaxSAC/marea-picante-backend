const { Op } = require('sequelize');
const { Product } = require('../models/product.model');

const services = {}

// Función para generar código automático
async function generateCategoryCode(name) {
  // Tomar las 3 primeras letras del nombre y convertirlas a mayúsculas
  const prefix = name.substring(0, 3).toUpperCase();
  
  // Buscar la última categoría con este prefijo
  const lastProduct = await Product.findOne({
    where: {
      code: {
        [Op.like]: `${prefix}%`
      }
    },
    order: [['code', 'DESC']]
  });
  
  let newCode;
  
  if (lastProduct) {
    // Extraer el número del último código
    const lastNumber = parseInt(lastProduct.code.substring(3), 10);
    // Incrementar y formatear con ceros a la izquierda
    newCode = `${prefix}${String(lastNumber + 1).padStart(3, '0')}`;
  } else {
    // Si no hay categorías con este prefijo, empezar con 001
    newCode = `${prefix}001`;
  }
  
  return newCode;
}

services.create = async (productData) => {
  productData.code = await generateCategoryCode(productData.name);
  productData.state = 1;
  return await Product.create(productData);
};

services.getAll = async () => {
  return await Product.findAll({ where: { state: 1 } });
};

services.getById = async (productId) => {
  return await Product.findAll({ where: { productId, state: 1 } });
};

services.update = async (productId, productData) => {
  return await Product.update(productData, { where: { productId } });
};

services.delete = async (productId) => {
  return await Product.update({ state: 0 }, { where: { productId } });
};

module.exports = { ProductService: services }