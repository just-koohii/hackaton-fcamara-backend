const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());

app.use(routes);

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log("Server is up and listening on port 4000");
});
