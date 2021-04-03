const router = require("express").Router();
const {
  escolaController,
  doadorController,
  paisController,
} = require("@controllers");

router.get("/perfil/escola/:id", escolaController.profile);
router.get("/perfil/doador/:id", doadorController.profile);
router.get("/perfil/pais/:id", paisController.profile);

module.exports = (app) => app.use(router);
