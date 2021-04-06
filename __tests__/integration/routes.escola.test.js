const request = require("supertest");
const truncate = require("@utils/truncate");
const { Enderecos, Escolas } = require("@models");
const app = require("../../src/app");

describe("Routes - Escola", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create school", async () => {
    const response = await request(app).post("/cadastro/escola").send({
      nome: "IFSP1",
      tipo: "municipal",
      email: "a2@a.com",
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

    await Escolas.create({
      nome: "IFSP1",
      tipo: "municipal",
      email: "a2@a.com",
      senha: "123456",
      id_endereco: endereco.id,
    });
    const response = await request(app).post("/login/escola").send({
      email: "a2@a.com",
      senha: "123456",
    });

    expect(response.status).toBe(200);
  });
});
