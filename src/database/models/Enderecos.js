const { Model, DataTypes } = require("sequelize");

class Enderecos extends Model {
  static init(sequelize) {
    super.init(
      {
        logradouro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        estado: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Pais, {
      foreignKey: "id_endereco",
      as: "endereco_pais",
    });
    this.hasMany(models.Escolas, {
      foreignKey: "id_endereco",
      as: "endereco_escola",
    });
    this.hasMany(models.Doadores, {
      foreignKey: "id_endereco",
      as: "endereco_doador",
    });
  }
}

module.exports = Enderecos;
