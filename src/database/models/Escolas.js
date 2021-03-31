module.exports = (sequelize, DataTypes) => {
  const Escolas = sequelize.define("Escolas", {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    hash_senha: DataTypes.STRING,
    tipo: DataTypes.STRING,
  });

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

  return Escolas;
};
