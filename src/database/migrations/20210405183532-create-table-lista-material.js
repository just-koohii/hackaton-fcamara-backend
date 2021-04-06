module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Lista-Material", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_lista: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Lista-Materiais", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_material: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Materiais", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Lista-Material");
  },
};
