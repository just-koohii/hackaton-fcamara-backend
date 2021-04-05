const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.params);

  if (!authorization) {
    return res.status(401).send("Token inválido");
  }

  const [, token] = authorization.split(" ");
  // console.log(Object.keys(req));

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.API_SECRET);

    if (req.params.id && decoded.id !== req.params.id) {
      return res.status(401).send("Não autorizado");
    }

    return next(req, res, next);
  } catch (err) {
    return res.status(401).send("Token inválido ou expirado");
  }
};
