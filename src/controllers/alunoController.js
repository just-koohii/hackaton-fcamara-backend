/* eslint-disable no-return-await */
/* eslint-disable no-console */
/* eslint-disable camelcase */
const { Alunos, Pais, ListaMateriais, ListaAluno } = require("@models");
const { error } = require("@utils/loggers");

async function store(req, res) {
  try {
    const { nome, email, id_escola } = req.body;

    if (!nome || !email || !id_escola)
      return res.status(400).send("Dados inválidos");

    let pais = await Pais.findOne({
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

    const id_pais = pais.id;

    if (!pais) return res.status(400).send("Pais não encontrados");

    const aluno = await Alunos.findOne({ where: { nome, id_pais } });

    if (!aluno) {
      const newAluno = await Alunos.create({
        nome,
        id_pais,
        id_escola,
      });

      pais = await Pais.findOne({
        attributes: {
          exclude: ["hash_senha", "id_endereco"],
        },
        include: [
          {
            association: "filhos",
            attributes: [],
            where: { id_pais },
          },
          {
            association: "endereco",
            attributes: {
              exclude: ["id"],
            },
          },
        ],
      });

      //      console.log(newAluno._options.includeMap);

      const listas = await ListaMateriais.findAll({
        where: { id_escola },
        include: {
          association: "material",
          attributes: {
            exclude: ["id_escola"],
          },
        },
      });

      if (listas.length !== 0)
        await Promise.all(
          listas[0].dataValues.material.map(
            async ({ ListaMaterial }) =>
              await ListaAluno.create({
                id_lista: listas[0].id,
                id_aluno: newAluno.id,
                id_material: ListaMaterial.id_material,
                doado: 0,
              })
          )
        );

      return res.send({
        id: newAluno.id,
        nome: newAluno.nome,
        pais,
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
