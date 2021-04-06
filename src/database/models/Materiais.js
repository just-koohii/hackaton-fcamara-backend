module.exports = (sequelize, DataTypes) => {
  const Materiais = sequelize.define("Materiais", {
    nome: DataTypes.STRING,
  });

  Materiais.associate = function (models) {
    this.belongsToMany(models.ListaMateriais, {
      foreignKey: "id_material",
      through: models.ListaMaterial,
      as: "lista",
    });

    this.hasMany(models.ListaAluno, {
      foreignKey: "id_material",
      as: "aluno",
    });
  };

  return Materiais;
};
