module.exports = (sequelize, DataTypes) => {
  const Materiais = sequelize.define("Materiais", {
    nome: DataTypes.STRING,
  });

  Materiais.associate = function (models) {
    this.hasMany(models.ListaMateriais, {
      foreignKey: "id_material",
      as: "material",
    });
  };

  return Materiais;
};
