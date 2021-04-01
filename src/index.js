require("module-alias/register");
const app = require("./app");

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log("Server is up and listening on port 4000");
});
