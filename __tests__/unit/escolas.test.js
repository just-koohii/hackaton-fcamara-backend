const bcrypt = require("bcryptjs");
const { Enderecos, Escolas } = require("@models");
const truncate = require("@utils/truncate");

describe("Escolas", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create item", async () => {
    const endereco = await Enderecos.create({
      logradouro: "Avenida 9 de abril",
      numero: "12",
      cidade: "cubatão",
      estado: "sp",
    });

    await Escolas.create({
      nome: "IFSP Campus Cubatão",
      email: "cbt.ifsp@edu.br",
      senha: "123456",
      tipo: "federal",
      id_endereco: endereco.id,
    });
  });

  it("should encrypt password field", async () => {
    const endereco = await Enderecos.create({
      logradouro: "Avenida 9 de abril",
      cidade: "cubatão",
      estado: "sp",
    });

    const escola = await Escolas.create({
      nome: "IFSP Campus Cubatão",
      email: "cbt.ifsp@edu.br",
      senha: "123456",
      tipo: "federal",
      id_endereco: endereco.id,
    });

    const compare = await bcrypt.compare(escola.senha, escola.hash_senha);

    expect(compare).toBe(true);
  });
});
