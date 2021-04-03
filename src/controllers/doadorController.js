const { Doadores, Enderecos } = require("@models");

async function store(req, res) {
  const {
    nome,
    email,
    senha,
    logradouro,
    numero = "S/N",
    cidade,
    estado,
  } = req.body;

  if (!nome || !email || !senha || !logradouro || !cidade || !estado)
    return res.status(400).send("Dados invalidos");

  const doador = await Doadores.findOne({ where: { email } });

  if (!doador) {
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

      const newDoador = await Doadores.create({
        nome,
        email,
        senha,
        id_endereco: newEndereco.id,
      });

      return res.send({
        id: newDoador.id,
        nome: newDoador.nome,
        email: newDoador.email,
        token: newDoador.signToken(),
      });
    }

    const newDoador = await Doadores.create({
      nome,
      email,
      senha,
      id_endereco: endereco.id,
    });

    return res.send({
      id: newDoador.id,
      nome: newDoador.nome,
      email: newDoador.email,
      token: newDoador.signToken(),
    });
  }
  return res.status(400).send("Doador ja cadastrado");
}

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) return res.status(400).send("Dados invalidos");

  const doador = await Doadores.findOne({ where: { email } });

  if (!doador) return res.status(404).send("Doador nao encontrado");

  if (!(await doador.checkPassword(senha)))
    return res.status(401).send("Senha incorreta");

  return res.send({
    id: doador.id,
    nome: doador.nome,
    email: doador.email,
    token: doador.signToken(),
  });
}

async function profile(req, res) {
  const { id } = req.params;

  const doador = await Doadores.findByPk(id, {
    attributes: {
      exclude: ["id", "hash_senha"],
    },
    include: {
      association: "endereco_doadores",
      attributes: { exclude: ["id"] },
    },
  });

  if (!doador) return res.status(404).send("Doador nao encontrado");

  return res.send(doador);
}

module.exports = {
  store,
  login,
  profile,
};
