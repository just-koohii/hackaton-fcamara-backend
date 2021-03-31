module.exports = (sequelize, DataTypes) => {
  const Pais = sequelize.define("Pais", {
    nome_mae: DataTypes.STRING,
    nome_pai: DataTypes.STRING,
    email: DataTypes.STRING,
    hash_senha: DataTypes.STRING,
  });

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

  return Pais;
};
