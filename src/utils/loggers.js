/* eslint-disable no-console */
const chalk = require("chalk");

const database = (text) => console.log(chalk.inverse.underline.blue(text));
const error = ({ message }) => console.log(chalk.bold.blue(`Erro\n${message}`));

module.exports = { database, error };
