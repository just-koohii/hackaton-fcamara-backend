module.exports = (sequelize, DataTypes) => {
  const Enderecos = sequelize.define("Enderecos", {
    logradouro: DataTypes.STRING,
    numero: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
  });

  Enderecos.associate = function (models) {
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
  };

  return Enderecos;
};
