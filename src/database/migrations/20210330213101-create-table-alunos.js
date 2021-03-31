module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Alunos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_pais: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Pais",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_escola: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Escolas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Alunos");
  },
};
