const router = require("express").Router();
const escolaController = require("@controllers/escolaController");

router.post("/cadastro/escola", escolaController.store);
router.post("/login/escola", escolaController.login);

module.exports = (app) => app.use(router);
