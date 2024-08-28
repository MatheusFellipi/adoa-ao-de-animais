import request from "supertest";
import app from "@shared/infra/http/config/app";

import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { AccountRepository } from "@modules/account/infra/typeorm/repositories/Account.repository";
import { AnimalModel } from "@modules/animal/model/animal";
import { UserTestSeeder } from "@shared/infra/typeorm/seeds/User.Test.seed";
import { Account } from "@modules/account/infra/typeorm/entities/Account.entity";

jest.setTimeout(50000);

const fakeAnimalData: AnimalModel = {
  "name": "Buddy",
  "description": "A friendly and energetic dog.",
  "origin": "Shelter",
  "size": 2,
  "gender": 2,
  "weight": "25kg",
  "birthDate": new Date(2020, 5, 15),
  "age": "3 years",
  "microchipCode": "123456789",
};

describe("Test request created animals", () => {
  let connection: DataSource;
  let token: string;
  let account: Account;

  beforeAll(async () => {
    connection = await dbContext.initialize();
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
    const res_account = new AccountRepository();
    account = await res_account.findByEmail("cliente.teste.99@teste.com");
  }, 50000);

  it("Should not response 201 if missing auth in create animals", async () => {
    fakeAnimalData.user = account.user;
    await request(app)
      .post("/api-v1/animal")
      .send(fakeAnimalData)
      .expect(401);
  }, 50000);

  it("Should response 201 if create animals", async () => {
    fakeAnimalData.user = account.user;
    await request(app)
      .post("/api-v1/animal")
      .auth(token, { type: "bearer" })
      .send(fakeAnimalData)
      .expect(201);
  }, 50000);
});
