const bcrypt = require("bcryptjs");
const { Enderecos, Doadores } = require("@models");
const truncate = require("@utils/truncate");

describe("Doadores", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create item", async () => {
    const endereco = await Enderecos.create({
      logradouro: "Avenida 9 de abril",
      cidade: "cubatão",
      estado: "sp",
    });

    await Doadores.create({
      nome: "lorem ipsum",
      email: "doador@loremipsum.com",
      senha: "123456",
      id_endereco: endereco.id,
    });
  });

  it("should encrypt password field", async () => {
    const endereco = await Enderecos.create({
      logradouro: "Avenida 9 de abril",
      cidade: "cubatão",
      estado: "sp",
    });

    const doador = await Doadores.create({
      nome: "lorem ipsum",
      email: "doador@loremipsum.com",
      senha: "123456",
      id_endereco: endereco.id,
    });

    const compare = await bcrypt.compare(doador.senha, doador.hash_senha);

    expect(compare).toBe(true);
  });
});
