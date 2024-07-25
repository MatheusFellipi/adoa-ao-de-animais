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
  }, 30000);

  it("should respond with a 200 if email missing", async () => {
    const res = await request(app)
      .post("/api-v1/auth")
      .send({
        password: "Password@123123",
      })
      .expect(400);
    expect(res.body.message).toBe(
      "email must be longer than or equal to 6 characters,O email não pode estar vazio,email must be an email"
    );
  }, 30000);

  it("should respond with a 200 if password missing", async () => {
    const res = await request(app)
      .post("/api-v1/auth")
      .send({
        email: "cliente.teste.99@teste.com",
      })
      .expect(400);
    expect(res.body.message).toBe(
      "password must be longer than or equal to 8 characters,A senha não pode estar vazia,A senha não é forte o suficiente"
    );
  }, 30000);

  it("should respond with a 200 if user login email not exits in db", async () => {
    const res = await request(app)
      .post("/api-v1/auth")
      .send({
        email: "cliente@teste.com",
        password: "Password@123123",
      })
      .expect(400);
    expect(res.body.message).toBe("o email ou a senha esta incorreta");
  }, 30000);
});
