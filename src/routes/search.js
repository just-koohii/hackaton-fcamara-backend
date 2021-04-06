const router = require("express").Router();
const bearer = require("@middlewares/bearer");
const { escolaController, paisController } = require("@controllers");

router.get("/listar/escolas", escolaController.index);
router.get("/listar/escola/:id", escolaController.search);

router.use(bearer);

router.get("/listar/escola/:id/alunos", escolaController.listStudents);
router.get(
  "/listar/escola/:id/aluno/:id_aluno",
  escolaController.searchStudent
);

router.get("/listar/pais/:id/filhos", paisController.listChildren);
router.get("/listar/pais/:id/filho/:id_aluno", paisController.searchChild);

module.exports = (app) => app.use(router);
