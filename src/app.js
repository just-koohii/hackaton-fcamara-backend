require("dotenv").config({
  path: `.${process.env.NODE_ENV}.env`,
});

const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const consign = require("consign");

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(
      morgan(
        chalk`{yellow :method} :url {green :status} :response-time ms - :res[content-length]`
      )
    );
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
    consign({ cwd: "./src", verbose: false })
      .include("routes")
      .into(this.express);
  }
}

module.exports = new App().express;
