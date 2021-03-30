const { Model, DataTypes } = require("sequelize");

class Escolas extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        hash_senha: DataTypes.STRING,
        tipo: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Enderecos, {
      foreignKey: "id_endereco",
      as: "endereco_escola",
    });
    this.hasMany(models.Alunos, {
      foreignKey: "id_escola",
      as: "alunos_escola",
    });
  }
}

module.exports = Escolas;
