import request from "supertest";
import app from "@shared/infra/http/config/app";

import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { AccountRepository } from "@modules/account/infra/typeorm/repositories/Account.repository";
import { AnimalModel } from "@modules/animal/model/animal";
import { AnimalGender, AnimalSize } from "@modules/animal/enum/animal.enum";
import { UserTestSeeder } from "@shared/infra/typeorm/seeds/User.Test.seed";
import { Account } from "@modules/account/infra/typeorm/entities/Account.entity";

jest.setTimeout(30000);

const fakeAnimalData: AnimalModel = {
  name: "Buddy",
  description: "A friendly and energetic dog.",
  origin: "Shelter",
  size: AnimalSize.MEDIUM,
  gender: AnimalGender.MALE,
  weight: "25kg",
  birthDate: new Date(2020, 5, 15),
  age: "3 years",
  microchipCode: "123456789",
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
  }, 30000);

  it("Should not response 204 if missing auth in create animals", async () => {
    fakeAnimalData.user = account.user;
    const res_animal = await request(app)
      .post("/api-v1/animal")
      .auth(token, { type: "bearer" })
      .send(fakeAnimalData)
      .expect(201);

    await request(app).delete(`/api-v1/animal/${res_animal.body.id}`).expect(401);
  }, 30000);

  it("Should response 204 if delete animals", async () => {
    fakeAnimalData.user = account.user;
    const res_animal = await request(app)
      .post("/api-v1/animal")
      .auth(token, { type: "bearer" })
      .send(fakeAnimalData)
      .expect(201);

    await request(app)
      .delete(`/api-v1/animal/${res_animal.body.id}`)
      .auth(token, { type: "bearer" })
      .expect(204);
  }, 30000);

  it("Should not response 204 if animals not exists", async () => {
    const res = await request(app)
      .delete(`/api-v1/animal/223323`)
      .auth(token, { type: "bearer" })
      .expect(400);
    expect(res.body.message).toBe("o animal noa exitem no banco de dados")
  }, 30000);
});
