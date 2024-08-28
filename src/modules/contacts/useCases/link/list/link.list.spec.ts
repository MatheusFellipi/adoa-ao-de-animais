import request from "supertest";
import app from "@shared/infra/http/config/app";

import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { UserTestSeeder } from "@shared/infra/typeorm/seeds/User.Test.seed";

jest.setTimeout(50000);

describe("Test update user dadas", () => {
  let connection: DataSource;
  let token: string;

  beforeAll(async () => {
    connection = await dbContext.initialize();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  beforeEach(async () => {
    await runSeeders(connection, {
      seeds: [MainSeeder, UserTestSeeder],
    });
    const res = await request(app)
      .post("/api-v1/auth")
      .send({
        email: "cliente.teste.99@teste.com",
        password: "Password@123123",
      })
      .expect(200);
    token = res.body.token;
  }, 50000);

  it("should respond with a 200 if create contact", async () => {
    const res = await request(app)
      .get(`/api-v1/link/`)
      .auth(token, { type: "bearer" })
      .expect(200);
    expect(res.body).not.toBeNull();
  }, 50000);

  it("should respond with a 200 if auth missing list contacts", async () => {
    const res = await request(app).get(`/api-v1/link/`).expect(401);
    expect(res.body).not.toBeNull();
  }, 50000);
});
