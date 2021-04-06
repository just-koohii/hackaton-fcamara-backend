/* eslint-disable no-console */
/* eslint-disable camelcase */
const { Materiais } = require("@models");
const { error } = require("@utils/loggers");

async function index(req, res) {
  try {
    const materiais = await Materiais.findAll();

    if (!materiais)
      return res.status(404).send("Nenhuma material foi encontrado");

    return res.send(materiais);
  } catch (err) {
    error(err);
    return res.status(500).send("Erro do servidor");
  }
}

async function store(req, res) {
  try {
    const { nome } = req.body;

    if (!nome) return res.status(400).send("Dados inválidos");

    const material = await Materiais.findOne({ where: { nome } });

    if (!material) {
      const newMaterial = await Materiais.create({
        nome,
      });

      return res.send(newMaterial);
    }
    return res.status(400).send("Material já cadastrado");
  } catch (err) {
    error(err);
    return res.status(500).send("Erro do servidor");
  }
}

module.exports = {
  index,
  store,
};
