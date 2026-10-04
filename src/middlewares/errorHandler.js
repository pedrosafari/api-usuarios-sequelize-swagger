module.exports = function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      message: "Email ou CPF ja cadastrado",
    });
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Dados invalidos",
      errors: err.errors?.map((item) => item.message) || [],
    });
  }

  if (err.name === "TypeError" && /senha/.test(err.message || "")) {
    return res.status(400).json({ message: "O campo senha e obrigatorio" });
  }

  return res.status(500).json({ message: "Erro interno do servidor" });
};
