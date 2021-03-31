const bcrypt = require("bcryptjs");
const { Enderecos, Pais } = require("@models");
const truncate = require("@utils/truncate");

describe("Pais", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create item", async () => {
    const endereco = await Enderecos.create({
      logradouro: "Avenida 9 de abril",
      cidade: "cubatão",
      estado: "sp",
    });

    await Pais.create({
      nome_mae: "lorem ipsum",
      nome_pai: "dolor sit amet",
      email: "pais@loremipsum.com",
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

    const pais = await Pais.create({
      nome_mae: "lorem ipsum",
      email: "pais@loremipsum.com",
      senha: "123456",
      tipo: "federal",
      id_endereco: endereco.id,
    });

    const compare = await bcrypt.compare(pais.senha, pais.hash_senha);

    expect(compare).toBe(true);
  });
});
