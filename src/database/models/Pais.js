/* eslint-disable no-param-reassign */
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const Pais = sequelize.define(
    "Pais",
    {
      nome_mae: DataTypes.STRING,
      nome_pai: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.VIRTUAL,
      hash_senha: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async (pais) => {
          if (pais.senha) pais.hash_senha = await bcrypt.hash(pais.senha, 8);
        },
      },
    }
  );

  Pais.associate = function (models) {
    this.belongsTo(models.Enderecos, {
      foreignKey: "id_endereco",
      as: "endereco_pais",
    });
    this.hasMany(models.Alunos, {
      foreignKey: "id_pais",
      as: "alunos_pais",
    });
  };

  Pais.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.hash_senha);
  };

  return Pais;
};
