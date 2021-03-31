/* eslint-disable no-param-reassign */
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const Doadores = sequelize.define(
    "Doadores",
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.VIRTUAL,
      hash_senha: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async (doador) => {
          if (doador.senha)
            doador.hash_senha = await bcrypt.hash(doador.senha, 8);
        },
      },
    }
  );

  Doadores.associate = function (models) {
    this.belongsTo(models.Enderecos, {
      foreignKey: "id_endereco",
      as: "endereco_doadores",
    });
  };

  Doadores.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
  };

  return Doadores;
};
