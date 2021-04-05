module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Escola-Pais", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_escola: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Escolas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_pais: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Pais", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Escola-Pais");
  },
};
