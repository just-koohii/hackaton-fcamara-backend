module.exports = (sequelize, DataTypes) => {
  const Alunos = sequelize.define("Alunos", {
    nome: DataTypes.STRING,
  });

  Alunos.associate = function (models) {
    this.belongsTo(models.Pais, {
      foreignKey: "id_pais",
      as: "pais",
    });

    this.belongsTo(models.Escolas, {
      foreignKey: "id_escola",
      as: "escola",
    });

    this.hasMany(models.ListaAluno, {
      foreignKey: "id_aluno",
      as: "listas",
    });
  };

  return Alunos;
};
