const { Categorias } = require("@models");
const truncate = require("../../src/utils/truncate");

describe("Categorias", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create item", async () => {
    await Categorias.create({
      nome: "cadernos",
    });
  });
});
