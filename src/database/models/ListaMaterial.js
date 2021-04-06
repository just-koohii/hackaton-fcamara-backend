module.exports = (sequelize, DataTypes) => {
  const ListaMaterial = sequelize.define(
    "ListaMaterial",
    {
      quantidade: DataTypes.INTEGER,
    },
    {
      tableName: "Lista-Material",
    }
  );

  return ListaMaterial;
};
