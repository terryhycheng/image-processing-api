import app from "../index";
import request from "supertest";

describe("Testing routes in Express server", () => {
  it("Server should send a 200 status code for '/'", async () => {
    const response = await request(app).get("/");

    await expect(response.statusCode).toBe(200);
  });

  it("Server should send a 400 status code without any query to 'api/images'", async () => {
    const response = await request(app).get("/api/images");

    await expect(response.statusCode).toBe(400);
  });

  it("a 200 status code should be received with a correct query to 'api/images'", async () => {
    const query = "?filename=fjord";
    const response = await request(app).get(`/api/images${query}`);

    await expect(response.statusCode).toBe(200);
  });
});
