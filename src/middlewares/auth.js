require("dotenv").config();

module.exports = function auth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token de autenticacao nao informado" });
  }

  const token = authorization.substring(7);
  const userToken = process.env.USER_TOKEN || "user-token";
  const adminToken = process.env.ADMIN_TOKEN || "admin-token";

  if (token === adminToken) {
    req.user = { role: "admin" };
    return next();
  }

  if (token === userToken) {
    req.user = { role: "user" };
    return next();
  }

  return res.status(401).json({ message: "Token invalido" });
};
