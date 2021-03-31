module.exports = (sequelize, DataTypes) => {
  const Alunos = sequelize.define("Alunos", {
    nome: DataTypes.STRING,
  });

  Alunos.associate = function (models) {
    this.belongsTo(models.Pais, {
      foreignKey: "id_pais",
      as: "alunos_pais",
    });
    this.belongsTo(models.Escolas, {
      foreignKey: "id_escola",
      as: "alunos_escola",
    });
    this.hasOne(models.Lista_Materiais, {
      foreignKey: "id_aluno",
      as: "alunos_lista_materiais",
    });
  };

  return Alunos;
};
