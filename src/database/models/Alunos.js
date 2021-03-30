const { Model, DataTypes } = require("sequelize");

class Alunos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Pais, {
      foreignKey: "id_pais",
      as: "alunos_pais",
    });
    this.belongsTo(models.Escolas, {
      foreignKey: "id_escola",
      as: "alunos_escola",
    });
    this.hasOne(models.ListaMateriais, {
      foreignKey: "id_aluno",
      as: "alunos_lista_materiais",
    });
  }
}

module.exports = Alunos;
