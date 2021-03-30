module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("escolas", {
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
          model: "pais",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_escola: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "escolas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_lista_materiais: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "lista_materiais",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("escolas");
  },
};
