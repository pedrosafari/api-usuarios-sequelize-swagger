require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const usersRoutes = require("./routes/users.routes");
const errorHandler = require("./middlewares/errorHandler");
const db = require("./database/models");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota usada na apostila de Swagger.
app.use("/api/v1/users", usersRoutes);

// Alias mantido porque a apostila de Sequelize usa /api/v1/usuarios nos exemplos.
app.use("/api/v1/usuarios", usersRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API de Usuarios funcionando",
    swagger: "/api-docs",
  });
});

db.sequelize
  .authenticate()
  .then(() => console.log("DB conectado com sucesso!"))
  .catch((err) => console.error("Erro ao conectar no DB:", err.message));

app.use(errorHandler);

module.exports = app;
