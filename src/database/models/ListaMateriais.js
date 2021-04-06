module.exports = (sequelize, DataTypes) => {
  const ListaMateriais = sequelize.define(
    "ListaMateriais",
    {
      ano: DataTypes.INTEGER,
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

    this.belongsToMany(models.Materiais, {
      foreignKey: "id_lista",
      through: models.ListaMaterial,
      as: "material",
    });
  };

  return ListaMateriais;
};
