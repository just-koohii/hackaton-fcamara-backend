const router = require("express").Router();
const bearer = require("@middlewares/bearer");
const {
  escolaController,
  doadorController,
  paisController,
  alunoController,
} = require("@controllers");

router.post("/cadastro/escola", escolaController.store);
router.post("/login/escola", escolaController.login);

router.post("/cadastro/doador", doadorController.store);
router.post("/login/doador", doadorController.login);

router.post("/cadastro/pais", paisController.store);
router.post("/login/pais", paisController.login);

router.use("/cadastro/aluno", bearer);
router.post("/cadastro/aluno", alunoController.store);

module.exports = (app) => app.use(router);
