const { Category } = require('../models/category.model');
const { Op } = require('sequelize');

const services = {}

// Función para generar código automático
async function generateCategoryCode(name) {
  // Tomar las 3 primeras letras del nombre y convertirlas a mayúsculas
  const prefix = name.substring(0, 3).toUpperCase();
  
  // Buscar la última categoría con este prefijo
  const lastCategory = await Category.findOne({
    where: {
      code: {
        [Op.like]: `${prefix}%`
      }
    },
    order: [['code', 'DESC']]
  });
  
  let newCode;
  
  if (lastCategory) {
    // Extraer el número del último código
    const lastNumber = parseInt(lastCategory.code.substring(3), 10);
    // Incrementar y formatear con ceros a la izquierda
    newCode = `${prefix}${String(lastNumber + 1).padStart(3, '0')}`;
  } else {
    // Si no hay categorías con este prefijo, empezar con 001
    newCode = `${prefix}001`;
  }
  
  return newCode;
}

services.create = async (categoryData) => {
  categoryData.code = await generateCategoryCode(categoryData.name);
  categoryData.state = 1;
  return await Category.create(categoryData);
};

services.getAll = async () => {
  return await Category.findAll({ where: { state: 1 } });
};

services.getById = async (categoryId) => {
  return await Category.findAll({ where: { categoryId, state: 1 } });
};

services.update = async (categoryId, categoryData) => {
  return await Category.update(categoryData, { where: { categoryId: categoryId } });
};

services.delete = async (categoryId) => {
  return await Category.update({ state: 0 },{ where: { categoryId: categoryId } });
};

module.exports = { CategoryService: services }