import request from "supertest";
import app from "@shared/infra/http/config/app";
import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { UserTestSeeder } from "@shared/infra/typeorm/seeds/User.Test.seed";

jest.setTimeout(30000);

describe("Login", () => {
  let connection: DataSource;

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
  }, 30000);

  it("should respond with a 200 if user login", async () => {
    const res = await request(app)
      .post("/api-v1/auth")
      .send({
        email: "cliente.teste.99@teste.com",
        password: "Password@123123",
      })
      .expect(200);
    expect(res.body).not.toBeNull();
    expect(res.body.token).not.toBeNull();
    expect(res.body.email).toBe("cliente.teste.99@teste.com");
    expect(res.body.name).toBe("Example Organization");
    const logout = await request(app)
      .post("/api-v1/logout")
      .auth(res.body.token, { type: "bearer" })
      .send({})
      .expect(200);
  }, 30000);

  it("should respond with a 200 if user login", async () => {
    const res = await request(app)
      .post("/api-v1/auth")
      .send({
        email: "cliente.teste.99@teste.com",
        password: "Password@123123",
      })
      .expect(200);
    expect(res.body).not.toBeNull();
    expect(res.body.token).not.toBeNull();
    expect(res.body.email).toBe("cliente.teste.99@teste.com");
    expect(res.body.name).toBe("Example Organization");
    await request(app).post("/api-v1/logout").send({}).expect(401);
  }, 30000);

});
