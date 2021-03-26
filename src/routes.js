const router = require("express").Router();

router.get("/", (req, res) => {
  return res.send({ lorem: "Ipsum" });
});

router.get("/users", (req, res) => {
  const users = ["Lorem", "ipsum", "dolor"];

  return res.send(users);
});

router.get("/user", (req, res) => {
  const { name } = req.query;

  if (!name) return res.status(400).send(`Invalid name`);

  return res.send(`Hello ${name}`);
});

module.exports = router;
