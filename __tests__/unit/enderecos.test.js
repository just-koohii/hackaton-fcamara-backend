const { Enderecos } = require("@models");
const truncate = require("@utils/truncate");

describe("Endereços", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create item", async () => {
    await Enderecos.create({
      logradouro: "Avenida 9 de abril",
      numero: "12",
      cidade: "cubatão",
      estado: "sp",
    });
  });
});
