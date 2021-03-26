const request = require("supertest");

const app = require("../../src/app");

describe("Routes", () => {
  it("should request with valid params", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
  });

  it("shouldn't request with invalid params", async () => {
    const response = await request(app).get("/user?name=");

    expect(response.status).toBe(400);
  });
});
