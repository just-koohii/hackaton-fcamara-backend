const router = require("express").Router();
const {
  escolaController,
  doadorController,
  paisController,
} = require("@controllers");

router.post("/cadastro/escola", escolaController.store);
router.post("/login/escola", escolaController.login);

router.post("/cadastro/doador", doadorController.store);
router.post("/login/doador", doadorController.login);

router.post("/cadastro/pais", paisController.store);
router.post("/login/pais", paisController.login);

module.exports = (app) => app.use(router);
