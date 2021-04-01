const request = require("supertest");
const truncate = require("@utils/truncate");
const { Enderecos, Doadores } = require("@models");
const app = require("../../src/app");

describe("Routes - Doador", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should donator school", async () => {
    const response = await request(app).post("/cadastro/doador").send({
      nome: "Doador 1",
      email: "doador@loremipsum.com",
      senha: "123456",
      logradouro: "Lorem ipsum",
      numero: "34",
      cidade: "santos",
      estado: "sp",
    });

    expect(response.status).toBe(200);
  });

  it("should authenticate school with valid credentials", async () => {
    const endereco = await Enderecos.create({
      logradouro: "Lorem ipsum",
      numero: "34",
      cidade: "santos",
      estado: "sp",
    });

    await Doadores.create({
      nome: "Doador 1",
      email: "doador@loremipsum.com",
      senha: "123456",
      id_endereco: endereco.id,
    });
    const response = await request(app).post("/login/doador").send({
      email: "doador@loremipsum.com",
      senha: "123456",
    });

    expect(response.status).toBe(200);
  });
});
