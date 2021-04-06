module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Lista-Materiais", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("Lista-Materiais");
  },
};
