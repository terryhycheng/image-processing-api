import app from "../index";
const request = require("supertest");

describe("Testing index.ts", () => {
  it("Server should run normally", async () => {
    const response = await request(app).get("/");

    await expect(response.statusCode).toBe(200);
  });
});
