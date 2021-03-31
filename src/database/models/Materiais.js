module.exports = (sequelize, DataTypes) => {
  const Materiais = sequelize.define("Materiais", {
    nome: DataTypes.STRING,
    preco: DataTypes.FLOAT,
  });

  Materiais.associate = function (models) {
    this.belongsTo(models.Categorias, {
      foreignKey: "id_categoria",
      as: "materiais_categorias",
    });
    this.hasOne(models.Lista_Materiais, {
      foreignKey: "id_material",
      as: "material_lista_materiais",
    });
  };

  return Materiais;
};
