require("module-alias/register");
const chalk = require("chalk");
const app = require("./app");

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    chalk.bold.green(`Server is up and listening on port ${process.env.PORT}`)
  );
});
