/* eslint-disable no-param-reassign */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const Escolas = sequelize.define(
    "Escolas",
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.VIRTUAL,
      hash_senha: DataTypes.STRING,
      tipo: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async (escola) => {
          if (escola.senha)
            escola.hash_senha = await bcrypt.hash(escola.senha, 8);
        },
      },
    }
  );

  Escolas.associate = function (models) {
    this.belongsTo(models.Enderecos, {
      foreignKey: "id_endereco",
      as: "endereco",
    });
    this.hasMany(models.Alunos, {
      foreignKey: "id_escola",
      as: "alunos",
    });
    this.belongsToMany(models.Pais, {
      foreignKey: "id_escola",
      through: "Escola-Pais",
      as: "pais",
    });
  };

  Escolas.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.hash_senha);
  };

  Escolas.prototype.signToken = function () {
    return jwt.sign({ id: this.id }, process.env.API_SECRET, {
      expiresIn: "4 hours",
    });
  };

  return Escolas;
};
