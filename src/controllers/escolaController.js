const { Escolas, Enderecos } = require("@models");

async function store(req, res) {
  const {
    nome,
    tipo,
    email,
    senha,
    logradouro,
    numero = "S/N",
    cidade,
    estado,
  } = req.body;

  if (!nome || !tipo || !email || !senha || !logradouro || !cidade || !estado)
    return res.status(400).send("Dados invalidos");

  const escola = await Escolas.findOne({ where: { email } });

  if (!escola) {
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

      const newEscola = await Escolas.create({
        nome,
        tipo,
        email,
        senha,
        id_endereco: newEndereco.id,
      });

      return res.send({
        id: newEscola.id,
        nome: newEscola.nome,
        email: newEscola.email,
        token: newEscola.signToken(),
      });
    }

    const newEscola = await Escolas.create({
      nome,
      tipo,
      email,
      senha,
      id_endereco: endereco.id,
    });

    return res.send({
      id: newEscola.id,
      nome: newEscola.nome,
      email: newEscola.email,
      token: newEscola.signToken(),
    });
  }
  return res.status(400).send("Escola ja cadastrada");
}

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) return res.status(400).send("Dados invalidos");

  const escola = await Escolas.findOne({ where: { email } });

  if (!escola) return res.status(404).send("Escola nao encontrada");

  if (!(await escola.checkPassword(senha)))
    return res.status(401).send("Senha incorreta");

  return res.send({
    id: escola.id,
    nome: escola.nome,
    email: escola.email,
    token: escola.signToken(),
  });
}

async function profile(req, res) {
  const { id } = req.params;

  const escola = await Escolas.findByPk(id, {
    attributes: {
      exclude: ["id", "hash_senha"],
    },
    include: {
      association: "endereco_escola",
      attributes: { exclude: ["id"] },
    },
  });

  if (!escola) return res.status(404).send("Escola nao encontrada");

  return res.send(escola);
}

module.exports = {
  store,
  login,
  profile,
};
