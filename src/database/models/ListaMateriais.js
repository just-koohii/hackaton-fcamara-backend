/* eslint-disable camelcase */
const { Model } = require("sequelize");

class Lista_Materiais extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: "Lista_Materiais",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Pais, {
      foreignKey: "id_aluno",
      as: "alunos_lista_materiais",
    });
    this.belongsTo(models.Materiais, {
      foreignKey: "id_material",
      as: "material_lista_materiais",
    });
  }
}

module.exports = Lista_Materiais;
