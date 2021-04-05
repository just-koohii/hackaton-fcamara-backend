module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Lista-Aluno", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      doado: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_aluno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Alunos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_lista: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Lista-Materiais",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Lista-Aluno");
  },
};
