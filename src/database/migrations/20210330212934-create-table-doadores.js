module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Doadores", {
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      hash_senha: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_endereco: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Enderecos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Doadores");
  },
};
