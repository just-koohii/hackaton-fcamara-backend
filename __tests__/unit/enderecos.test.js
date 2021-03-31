const { Enderecos } = require("@models");
const truncate = require("../../src/utils/truncate");

describe("Endereços", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create item", async () => {
    await Enderecos.create({
      logradouro: "Rua martim francisco",
      cidade: "santos",
      estado: "sp",
    });
  });
});
