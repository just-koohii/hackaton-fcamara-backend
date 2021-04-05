module.exports = (sequelize, DataTypes) => {
  const ListaMateriais = sequelize.define(
    "ListaMateriais",
    {
      quantidade: DataTypes.INTEGER,
    },
    {
      tableName: "Lista-Materiais",
    }
  );

  ListaMateriais.associate = function (models) {
    this.belongsTo(models.Escolas, {
      foreignKey: "id_escola",
      as: "escola",
    });

    this.belongsTo(models.Materiais, {
      foreignKey: "id_material",
      as: "material",
    });
  };

  return ListaMateriais;
};
