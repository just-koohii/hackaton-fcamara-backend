/* eslint-disable camelcase */
const { Pais, Enderecos, Alunos, Escolas } = require("@models");
const { error } = require("@utils/loggers");

async function store(req, res) {
  try {
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
  } catch (err) {
    error(err);
    return res.status(500).send("Erro do servidor");
  }
}

async function login(req, res) {
  try {
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
  } catch (err) {
    error(err);
    return res.status(500).send("Erro do servidor");
  }
}

async function profile(req, res) {
  try {
    const { id } = req.params;

    const pais = await Pais.findByPk(id, {
      attributes: {
        exclude: ["id", "hash_senha"],
      },
      include: [
        {
          association: "endereco",
          attributes: { exclude: ["id"] },
        },
        {
          association: "alunos",
          attributes: { exclude: ["id"] },
        },
      ],
    });

    if (!pais) return res.status(404).send("Pais nao encontrados");

    return res.send(pais);
  } catch (err) {
    error(err);
    return res.status(500).send("Erro do servidor");
  }
}

async function listChildren(req, res) {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send("ID não providenciado");

    const alunos = await Alunos.findAll({
      where: {
        id_pais: id,
      },
      attributes: {
        exclude: ["id_pais"],
      },
      include: {
        association: "alunos_escola",
        attributes: {
          exclude: ["id", "hash_senha", "id_endereco"],
        },
        include: {
          association: "endereco_escola",
          attributes: {
            exclude: ["id"],
          },
        },
      },
    });

    if (!alunos) return res.status(404).send("Nenhum aluno foi encontrado");

    return res.send(alunos);
  } catch (err) {
    error(err);
    return res.status(500).send("Erro do servidor");
  }
}

async function searchChild(req, res) {
  try {
    const { id, id_aluno } = req.params;

    if (!id || !id_aluno) return res.status(400).send("IDs não providenciados");

    const aluno = await Alunos.findByPk(id_aluno, {
      where: {
        id_pais: id,
      },
      attributes: {
        exclude: ["id_pais"],
      },
      include: {
        association: "alunos_escola",
        attributes: {
          exclude: ["id", "hash_senha", "id_endereco"],
        },
        include: {
          association: "endereco_escola",
          attributes: {
            exclude: ["id"],
          },
        },
      },
    });

    if (!aluno) return res.status(404).send("Aluno não encontrado");

    return res.send(aluno);
  } catch (err) {
    error(err);
    return res.status(500).send("Erro do servidor");
  }
}

async function associateSchool(req, res) {
  try {
    const { id } = req.params;
    const { id_escola } = req.body;

    if (!id || !id_escola)
      return res.status(400).send("IDs não providenciados");

    const pais = await Pais.findByPk(id, {
      attributes: {
        exclude: ["hash_senha", "id_endereco"],
      },
    });

    if (!pais) return res.status(404).send("Pais não encontrados");

    const escola = await Escolas.findByPk(id_escola, {
      attributes: {
        exclude: ["hash_senha", "id_endereco"],
      },
    });

    if (!escola) return res.status(404).send("Escola não encontrada");

    const associated = await escola.addPai(pais);

    if (!associated) return res.status(403).send("Escola já vinculada");

    return res.send(associated);
  } catch (err) {
    error(err);
    return res.status(500).send("Erro do servidor");
  }
}

module.exports = {
  store,
  login,
  profile,
  listChildren,
  searchChild,
  associateSchool,
};
