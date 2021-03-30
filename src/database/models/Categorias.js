const { Model, DataTypes } = require("sequelize");

class Categorias extends Model {
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
    this.hasOne(models.Materiais, {
      foreignKey: "id_categoria",
      as: "materiais_categorias",
    });
  }
}

module.exports = Categorias;
