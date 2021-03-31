/* eslint-disable no-param-reassign */
const bcrypt = require("bcryptjs");

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
      as: "endereco_escola",
    });
    this.hasMany(models.Alunos, {
      foreignKey: "id_escola",
      as: "alunos_escola",
    });
  };

  Escolas.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
  };

  return Escolas;
};
