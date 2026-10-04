const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Usuários, Contatos e Endereços",
      version: "1.0.0",
      description: "Documentação da API desenvolvida com Express e Sequelize",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
      schemas: {
        UsuarioEntrada: {
          type: "object",
          required: ["nome", "email", "senha"],
          properties: {
            nome: { type: "string", example: "Ana Silva" },
            email: { type: "string", example: "ana@teste.com" },
            senha: { type: "string", example: "123456" },
            cpf: { type: "string", nullable: true, example: "111.222.333-44" },
            rg: { type: "string", nullable: true, example: "12.345.678-9" },
            dataNascimento: {
              type: "string",
              format: "date",
              nullable: true,
              example: "1995-08-20",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
