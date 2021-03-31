module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Escolas", {
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
      tipo: {
        type: Sequelize.STRING(9),
        allowNull: false,
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
    await queryInterface.dropTable("Escolas");
  },
};
