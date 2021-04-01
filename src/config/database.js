/* eslint-disable no-console */
require("dotenv").config({
  path: `.${process.env.NODE_ENV}.env`,
});

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  logging: process.env.NODE_ENV === "dev" ? console.log : false,
  define: {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  },
};
