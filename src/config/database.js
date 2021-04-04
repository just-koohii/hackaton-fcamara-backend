/* eslint-disable no-console */
require("dotenv").config({
  path: `.${process.env.NODE_ENV}.env`,
});
const chalk = require("chalk");

const logger = (text) => console.log(chalk.inverse.underline.blue(text));

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  logging: process.env.NODE_ENV === "dev" ? logger : false,
  define: {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  },
};
