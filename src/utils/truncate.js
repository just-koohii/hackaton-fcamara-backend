const { sequelize } = require("@models");

module.exports = () =>
  Promise.all(
    Object.keys(sequelize.models).map((key) =>
      sequelize.models[key].destroy({
        truncate: { cascade: true },
        force: true,
      })
    )
  );
