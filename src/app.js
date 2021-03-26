require("dotenv").config({
  path: `.${process.env.NODE_ENV}.env`,
});

const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes");

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(morgan("combined"));
    this.express.use(express.json());
    this.express.use(compression());
    this.express.use(helmet());
    this.express.use(
      cors({
        /*
         *  Substituir origin com a URL do front;
         */
        origin: "*",
      })
    );
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;
