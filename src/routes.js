const router = require("express").Router();

router.get("/", (req, res) => {
  res.send({ lorem: "Ipsum" });
});

router.get("/:name", (req, res) => {
  const { name } = req.params;

  return res.send(`Hello ${name}`);
});

module.exports = router;
