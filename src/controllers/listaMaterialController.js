/* eslint-disable no-console */
/* eslint-disable camelcase */
const {
  Escolas,
  ListaMateriais,
  Materiais,
  Alunos,
  ListaMaterial,
} = require("@models");
const { error } = require("@utils/loggers");

async function search(req, res) {
  try {
    const { id_escola } = req.params;

    const lista = await ListaMateriais.findAll({
      where: { id_escola },
      attributes: { exclude: ["id_escola"] },
      include: {
        association: "material",
        attibutes: {
          exclude: ["id_escola"],
        },
        through: {
          attributes: ["quantidade"],
        },
      },
    });

    return res.send(lista);
  } catch (err) {
    error(err);
    return res.status(500).send("Erro do servidor");
  }
}

async function store(req, res) {
  try {
    const { id_escola, ano } = req.params;
    const { items } = req.body;

    if (!items.length === 0 || items.every(({ qtd }) => qtd === 0))
      return res.status(400).send("Dados inválidos");

    const escola = await Escolas.findByPk(id_escola, {
      attibutes: {
        exclude: ["id", "email", "hash_senha"],
      },
    });

    if (!escola) return res.status(404).send("Escola nao encontrada");

    const [listaItem, created] = await ListaMateriais.findOrCreate({
      where: { ano, id_escola },
    });

    if (created) {
      await Promise.all(
        items.map(async ({ id, qtd }) => {
          const material = await Materiais.findByPk(id);

          if (!(await listaItem.hasMaterial(material))) {
            await listaItem.addMaterial(material, {
              through: { quantidade: qtd },
            });
          }
        })
      );

      const alunos = await Alunos.findAll({
        where: {
          id_escola,
        },
      });

      await Promise.all(
        items.map(async ({ id }) =>
          alunos.map((item) => {
            console.log(listaItem);
            return ListaMaterial.create({
              id_lista: listaItem.id,
              id_aluno: item.id,
              id_material: id,
              quantidade: 0,
            });
          })
        )
      );

      const lista = await ListaMateriais.findByPk(listaItem.id, {
        attributes: { exclude: ["id_escola"] },
        include: {
          association: "material",
          attibutes: {
            exclude: ["id_escola"],
          },
          through: {
            attributes: ["quantidade"],
          },
        },
      });

      return res.send(lista);
    }

    return res.status(400).send("Lista ja cadastrada");
  } catch (err) {
    error(err);
    return res.status(500).send("Erro do servidor");
  }
}

module.exports = {
  store,
  search,
};
