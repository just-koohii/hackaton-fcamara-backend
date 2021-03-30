const { Model, DataTypes } = require("sequelize");

class Materiais extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        preco: DataTypes.FLOAT,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Categorias, {
      foreignKey: "id_categoria",
      as: "materiais_categorias",
    });
    this.hasOne(models.ListaMateriais, {
      foreignKey: "id_material",
      as: "material_lista_materiais",
    });
  }
}

module.exports = Materiais;
