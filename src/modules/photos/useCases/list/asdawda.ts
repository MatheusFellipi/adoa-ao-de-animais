import request from "supertest";
import app from "@shared/infra/http/config/app";

import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { UserTestSeeder } from "@shared/infra/typeorm/seeds/User.Test.seed";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import { AnimalRepository } from "@modules/animal/infra/typeorm/repositories/Animal.repository";
import { AccountRepository } from "@modules/account/infra/typeorm/repositories/Account.repository";


describe("Test list photos", () => {
  let connection: DataSource;
  let token: string;

  let animal: Animal[]

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
    const res_account = new AccountRepository()
    const res_animal = new AnimalRepository()
    const account_id = (await res_account.findByEmail("cliente.teste.99@teste.com")).id
    animal = await res_animal.listAllByAccount(account_id)
  }, 30000);

  it("should respond with a 200 if create contact", async () => {
    const res = await request(app)
      .get(`/api-v1/photo/${animal[0].id}`)
      .auth(token, { type: "bearer" })
      .expect(200);
    expect(res.body).not.toBeNull();
  }, 30000);

  it("should respond with a 200 if auth missing list contacts", async () => {
    const res = await request(app).get(`/api-v1/photo/${animal[0].id}`).expect(401);
    expect(res.body).not.toBeNull();
  }, 30000);
});
