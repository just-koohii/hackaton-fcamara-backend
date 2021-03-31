module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Lista_Materiais", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      id_material: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Materiais",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Lista_Materiais");
  },
};
