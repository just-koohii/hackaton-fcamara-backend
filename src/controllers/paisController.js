/* eslint-disable camelcase */
const { Pais, Enderecos } = require("@models");

async function store(req, res) {
  const {
    nome_mae,
    nome_pai,
    email,
    senha,
    logradouro,
    numero = "S/N",
    cidade,
    estado,
  } = req.body;

  if (!nome_mae || !email || !senha || !logradouro || !cidade || !estado)
    return res.status(400).send("Dados invalidos");

  const pais = await Pais.findOne({ where: { email } });

  if (!pais) {
    const endereco = await Enderecos.findOne({
      where: { logradouro, numero, cidade, estado },
    });

    if (!endereco) {
      const newEndereco = await Enderecos.create({
        logradouro,
        numero,
        cidade,
        estado,
      });

      const newPais = await Pais.create({
        nome_mae,
        nome_pai,
        email,
        senha,
        id_endereco: newEndereco.id,
      });

      return res.send({
        id: newPais.id,
        nome: newPais.nome,
        email: newPais.email,
        token: newPais.signToken(),
      });
    }

    const newPais = await Pais.create({
      nome_mae,
      nome_pai,
      email,
      senha,
      id_endereco: endereco.id,
    });

    return res.send({
      id: newPais.id,
      nome: newPais.nome,
      email: newPais.email,
      token: newPais.signToken(),
    });
  }
  return res.status(400).send("Pais ja cadastrados");
}

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) return res.status(400).send("Dados invalidos");

  const pais = await Pais.findOne({ where: { email } });

  if (!pais) return res.status(404).send("Pais nao encontrado");

  if (!(await pais.checkPassword(senha)))
    return res.status(401).send("Senha incorreta");

  return res.send({
    id: pais.id,
    nome: pais.nome,
    email: pais.email,
    token: pais.signToken(),
  });
}

async function profile(req, res) {
  const { id } = req.params;

  const pais = await Pais.findByPk(id, {
    attributes: {
      exclude: ["id", "hash_senha"],
    },
    include: [
      {
        association: "endereco_pais",
        attributes: { exclude: ["id"] },
      },
      {
        association: "alunos_pais",
        attributes: { exclude: ["id"] },
      },
    ],
  });

  if (!pais) return res.status(404).send("Pais nao encontrados");

  return res.send(pais);
}

module.exports = {
  store,
  login,
  profile,
};
