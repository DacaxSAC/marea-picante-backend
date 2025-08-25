const express = require("express");
const dotenv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const { initializeData } = require("./utils/initializeData.util");

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
const corsOptions = {
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'https://marea-picante-backend.onrender.com'], // Permitir ambos orígenes
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permitir cookies y credenciales
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir estos encabezados
};
app.use(cors(corsOptions));

// Configuración de la base de datos
const sequelize = require('./utils/database.util');

// Associations
const { Client } = require("./models/client.model");
const { Employee } = require("./models/employee.model");
const { Product } = require("./models/product.model");
const { Category } = require("./models/category.model");
const { Order } = require("./models/order.model");
const { OrderDetail } = require("./models/orderDetail.model");
const { OrderTable } = require("./models/orderTable.model");
const { Table } = require("./models/table.model");
const User = require("./models/user.model");

// Product-Category associations
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'categorias' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'productos' });

// Order associations
Order.belongsTo(Client, { foreignKey: 'clientId', as: 'cliente' });
Order.belongsTo(Employee, { foreignKey: 'employeeId', as: 'empleado' });
Order.hasMany(OrderDetail, { foreignKey: 'orderId', as: 'detalles' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });
OrderDetail.belongsTo(Product, { foreignKey: 'productId', as: 'producto' });

// Order-Table associations
Order.belongsToMany(Table, { through: OrderTable, as: 'mesas' });
Table.belongsToMany(Order, { through: OrderTable, as: 'ordenes' });

// User associations
Client.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Client, { foreignKey: 'userId' });
Employee.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Employee, { foreignKey: 'userId' });

// Verificar conexión a la base de datos
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos PostgreSQL");
    
    await sequelize.sync({ 
        // force: true // Habilitar temporalmente para recrear las tablas
    });
    console.log("Modelos sincronizados con la base de datos");
    
    // Inicializar datos después de sincronizar
    // await initializeData();
  } catch (error) {
    console.error("Error en la inicialización de la base de datos:", error);
    process.exit(1); // Terminar la aplicación si no se puede conectar a la BD
  }
};

initializeDatabase();

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de sistema ERP para restaurantes",
      version: "1.0.0",
      description: "API para manejar todos los procesos de un restaurante",
    },
    servers: [{ url: process.env.URL_API }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
const { AuthRoutes } = require("./routes/auth.routes");
const { CategoryRoutes } = require('./routes/category.routes');
const { ProductRoutes } = require('./routes/product.routes');
const { TableRoutes } = require('./routes/table.routes');
const { ClientRoutes } = require('./routes/client.routes');
const { EmployeeRoutes } = require('./routes/employee.routes');
const { OrderRoutes } = require('./routes/order.routes');
const { UserRoutes } = require('./routes/user.routes');
const { RoleRoutes } = require('./routes/role.routes'); // Agregar esta línea

app.use("/api/auth", AuthRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/tables', TableRoutes);
app.use('/api/clients', ClientRoutes);
app.use('/api/employees', EmployeeRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/roles', RoleRoutes); // Agregar esta línea

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Escuchando puerto de entrada
const PORT = process.env.PORT || 3000;
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();