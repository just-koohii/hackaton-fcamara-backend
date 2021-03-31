module.exports = (sequelize) => {
  const ListaMateriais = sequelize.define("Lista_Materiais", {});

  ListaMateriais.associate = function (models) {
    this.belongsTo(models.Pais, {
      foreignKey: "id_aluno",
      as: "alunos_lista_materiais",
    });
    this.belongsTo(models.Materiais, {
      foreignKey: "id_material",
      as: "material_lista_materiais",
    });
  };

  return ListaMateriais;
};
