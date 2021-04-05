/* eslint-disable no-console */
/* eslint-disable camelcase */
const { Alunos, Pais } = require("@models");
const { error } = require("@utils/loggers");

async function store(req, res) {
  try {
    const { nome, email, id_escola } = req.body;

    if (!nome || !email || !id_escola)
      return res.status(400).send("Dados inválidos");

    const pais = await Pais.findOne({
      where: { email },
      attributes: {
        exclude: ["hash_senha", "id_endereco"],
      },
      include: {
        association: "endereco",
        attributes: {
          exclude: ["id"],
        },
      },
    });

    if (!pais) return res.status(400).send("Pais não encontrados");

    const aluno = await Alunos.findOne({ where: { nome, id_pais: pais.id } });

    if (!aluno) {
      const newAluno = await Alunos.create({
        nome,
        id_pais: pais.id,
        id_escola,
      });

      return res.send({
        id: newAluno.id,
        nome: newAluno.nome,
        alunos_pais: {
          nome_mae: pais.nome_mae,
          nome_pai: pais.nome_pai,
          email: pais.email,
          id_escola: pais.id_escola,
          endereco: {
            ...pais.endereco.dataValues,
          },
        },
      });
    }
    return res.status(400).send("Aluno já cadastrado");
  } catch (err) {
    error(err);
    return res.status(400).send("Erro do servidor");
  }
}

async function search(req, res) {
  try {
    const { id, id_aluno } = req.params;

    if (!id || !id_aluno) return res.status(404).send("IDs não providenciados");

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

module.exports = {
  store,
  search,
};
