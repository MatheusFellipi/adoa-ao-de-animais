import request from "supertest";
import app from "@shared/infra/http/config/app";
import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { AccountRepository } from "@modules/account/infra/typeorm/repositories/Account.repository";
import { UserTestSeeder } from "@shared/infra/typeorm/seeds/User.Test.seed";
import userTest from "../../../../../resources/user-test.json";
import { Account } from "@modules/account/infra/typeorm/entities/Account.entity";

jest.setTimeout(30000);

describe("Test update user dadas", () => {
  let connection: DataSource;
  let respo: AccountRepository;
  let user: Account;
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
    respo = new AccountRepository();
    user = await respo.findByEmail("cliente.teste.99@teste.com");
  }, 30000);

  it("should respond with a 201 if update user", async () => {
    const res = await request(app)
      .put(`/api-v1/user`)
      .auth(token, { type: "bearer" })
      .send({
        ...user.user,
        "name": " atualizado",
        "description": "atualizado",
        "type": 1,
        "cnpj_cpf": "1234567890",
      })
      .expect(200);
      expect(res.body).not.toBeNull()
      expect(user.user.name).not.toBe("atualizado")
      expect(res.body.avatar).toBeNull()
      expect(user.user.cnpj_cpf).not.toBe("1234567890")
      expect(user.user.description).not.toBe("atualizado")
      expect(user.user.type).toBe(1)
  }, 30000);

  it("should not respond with a 201 if auth missing id request", async () => {
    await request(app)
      .put(`/api-v1/user`)
      .send({
        ...user.user,
      })
      .expect(401);
  }, 30000);
});
