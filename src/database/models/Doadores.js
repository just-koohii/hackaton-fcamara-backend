const { Model, DataTypes } = require("sequelize");

class Doadores extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        hash_senha: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Enderecos, {
      foreignKey: "id_endereco",
      as: "endereco_doadores",
    });
  }
}

module.exports = Doadores;
