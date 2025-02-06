const express = require("express");
const dotenv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'https://zero01-back-restaurant-erp.onrender.com'], // Permitir ambos orígenes
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permitir cookies y credenciales
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir estos encabezados
};
app.use(cors(corsOptions));

// Configuración de la base de datos
const sequelize = require('./utils/database.util');

// Associations
const { Product } = require("./models/product.model");
const { Category } = require("./models/category.model");

Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'categorias' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'productos' });

// Verificar conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log("Conectado a la base de datos PostgreSQL"))
  .catch((err) => console.error("No se pudo conectar a la base de datos", err));

sequelize
  .sync(
    { 
      // force: true 
    }
  )
  .then(() => console.log("Modelos sincronizados con la base de datos"))
  .catch((err) => console.error("Error al sincronizar los modelos", err));

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

app.use("/api/auth", AuthRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/tables', TableRoutes);
app.use('/api/clients', ClientRoutes);
app.use('/api/employees', EmployeeRoutes);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Escuchando puerto de entrada
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

