const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("Token inválido");
  }

  const [, token] = authorization.split(" ");

  try {
    await promisify(jwt.verify)(token, process.env.API_SECRET);

    return next();
  } catch (err) {
    return res.status(401).send("Token inválido ou expirado");
  }
};
