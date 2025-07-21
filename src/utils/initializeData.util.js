const { CategoryService } = require('../services/category.service');
const { ProductService } = require('../services/product.service');
const { TableService } = require('../services/table.service');
const { User } = require('../models/user.model');
const { Employee } = require('../models/employee.model');

const {
  categories,
  products,
  tables
} = require('../utils/defaultData.util');



// Función principal para inicializar todos los datos
const initializeData = async () => {
  try {
    console.log("Iniciando carga de datos iniciales...");

    // Inicializar categorías
    await initializeCategories(categories);

    // Inicializar productos
    await initializeProducts(products);

    // Inicializar mesas
    await initializeTables(tables);

    // Inicializar usuario administrador
    // await initializeAdminUser();

    console.log("Datos iniciales cargados correctamente");
  } catch (error) {
    console.error("Error al inicializar datos:", error);
    throw error;
  }
};

// Inicializar categorías
const initializeCategories = async (categories) => {
  console.log("Creando categorías iniciales...");
  for (const category of categories) {
    await CategoryService.create(category);
  }
  console.log(`${categories.length} categorías creadas`);
};

// Inicializar productos
const initializeProducts = async (products) => {
  console.log("Creando productos iniciales...");
  for (const product of products) {
    await ProductService.create(product);
  }
  console.log(`${products.length} productos creados`);
};

// Inicializar mesas
const initializeTables = async (tables) => {
  console.log("Creando mesas iniciales...");
  for (const table of tables) {
    await TableService.create(table);
  }
  console.log(`${tables.length} mesas creadas`);
};

// Inicializar usuario administrador
const initializeAdminUser = async () => {
  console.log("Creando usuario administrador...");

  const adminUser = await User.create({
    username: "admin",
    password: "admin123", // En producción, usar hash
    email: "admin@mareapicanterestaurant.com",
    role: "admin",
    state: 1
  });

  await Employee.create({
    userId: adminUser.userId,
    firstName: "Administrador",
    lastName: "Sistema",
    position: "Gerente",
    state: 1
  });

  console.log("Usuario administrador creado");
};

module.exports = { initializeData };