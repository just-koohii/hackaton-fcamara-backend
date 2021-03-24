const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send({ lorem: "Ipsum" });
});

app.listen(4000, () => {
  console.log("Server is up and listening on port 4000");
});
