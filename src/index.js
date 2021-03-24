const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes");

const app = express();

app.use(morgan("combined"));

app.use(express.json());

app.use(compression());

app.use(helmet());

app.use(
  cors({
    /*
     *  Substituir origin com a URL do front;
     */
    origin: "*",
  })
);

app.use(routes);

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log("Server is up and listening on port 4000");
});
