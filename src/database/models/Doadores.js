module.exports = (sequelize, DataTypes) => {
  const Doadores = sequelize.define("Doadores", {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    hash_senha: DataTypes.STRING,
  });

  Doadores.associate = function (models) {
    this.belongsTo(models.Enderecos, {
      foreignKey: "id_endereco",
      as: "endereco_doadores",
    });
  };

  return Doadores;
};
