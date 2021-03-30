const { Model, DataTypes } = require("sequelize");

class Pais extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_mae: DataTypes.STRING,
        nome_pai: DataTypes.STRING,
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
      as: "endereco_pais",
    });
    this.hasMany(models.Alunos, {
      foreignKey: "id_pais",
      as: "alunos_pais",
    });
  }
}

module.exports = Pais;
