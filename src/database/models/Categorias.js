module.exports = (sequelize, DataTypes) => {
  const Categorias = sequelize.define("Categorias", {
    nome: DataTypes.STRING,
  });

  Categorias.associate = function (models) {
    this.hasOne(models.Materiais, {
      foreignKey: "id_categoria",
      as: "materiais_categorias",
    });
  };

  return Categorias;
};
