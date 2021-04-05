/* eslint-disable camelcase */
const { Escolas, Enderecos, Alunos } = require("@models");
const { error } = require("@utils/loggers");

async function index(req, res) {
  try {
    const escolas = await Escolas.findAll({
      attributes: {
        exclude: ["email", "hash_senha", "id_endereco"],
      },
      include: [
        {
          association: "endereco",
          attributes: { exclude: ["id"] },
        },
        {
          association: "pais",
          attributes: { exclude: ["id"] },
        },
      ],
    });

    if (!escolas) return res.status(404).send("Nenhuma escola foi encontrada");

    return res.send(escolas);
  } catch (err) {
    error(err);
    return res.status(400).send("Erro do servidor");
  }
}

async function search(req, res) {
  try {
    const { id } = req.params;

    if (!id) return res.status(404).send("ID não providenciado");

    const escola = await Escolas.findByPk(id, {
      attributes: {
        exclude: ["email", "hash_senha", "id_endereco"],
      },
      include: {
        association: "endereco",
        attributes: { exclude: ["id"] },
      },
    });

    if (!escola) return res.status(404).send("Escola nao encontrada");

    return res.send(escola);
  } catch (err) {
    error(err);
    return res.status(400).send("Erro do servidor");
  }
}

async function listStudents(req, res) {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send("ID não providenciado");
    // alunos_pais
    const alunos = await Alunos.findAll({
      where: {
        id_escola: id,
      },
      attributes: {
        exclude: ["id_pais", "id_escola"],
      },
      include: {
        association: "alunos_pais",
        attributes: {
          exclude: ["id", "hash_senha", "id_endereco"],
        },
        include: {
          association: "endereco_pais",
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
    return res.status(400).send("Erro do servidor");
  }
}

async function searchStudent(req, res) {
  try {
    const { id, id_aluno } = req.params;

    if (!id || !id_aluno) return res.status(400).send("IDs não providenciados");

    const aluno = await Alunos.findByPk(id_aluno, {
      where: {
        id_escola: id,
      },
    });

    if (!aluno) return res.status(404).send("Aluno não encontrado");

    return res.send(aluno);
  } catch (err) {
    error(err);
    return res.status(400).send("Erro do servidor");
  }
}

async function store(req, res) {
  try {
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
  } catch (err) {
    error(err);
    return res.status(400).send("Erro do servidor");
  }
}

async function login(req, res) {
  try {
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
  } catch (err) {
    error(err);
    return res.status(400).send("Erro do servidor");
  }
}

async function profile(req, res) {
  try {
    const { id } = req.params;

    if (!id) return res.status(404).send("ID não providenciado");

    const escola = await Escolas.findByPk(id, {
      attributes: {
        exclude: ["id", "hash_senha"],
      },
      include: {
        association: "endereco",
        attributes: { exclude: ["id"] },
      },
    });

    if (!escola) return res.status(404).send("Escola nao encontrada");

    return res.send(escola);
  } catch (err) {
    error(err);
    return res.status(400).send("Erro do servidor");
  }
}

module.exports = {
  index,
  search,
  listStudents,
  searchStudent,
  store,
  login,
  profile,
};
