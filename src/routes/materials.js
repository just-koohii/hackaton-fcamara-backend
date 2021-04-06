const router = require("express").Router();
// const bearer = require("@middlewares/bearer");
const { materialController, listaMaterialController } = require("@controllers");

router.get("/listar/materiais", materialController.index);
router.post("/cadastro/material", materialController.store);
router.post(
  "/cadastro/escola/:id_escola/lista/:ano",
  listaMaterialController.store
);

router.get("/listar/escola/:id_escola/listas", listaMaterialController.search);

module.exports = (app) => app.use(router);
