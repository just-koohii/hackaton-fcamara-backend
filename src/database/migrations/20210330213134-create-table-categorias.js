module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Categorias", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Categorias");
  },
};
