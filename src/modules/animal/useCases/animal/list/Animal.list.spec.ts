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

describe("Test animal queries", () => {
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

  it("Should retrieve animals filtered by name", async () => {
    fakeAnimalData.user = account.user;
    await request(app)
      .post("/api-v1/animal")
      .auth(token, { type: "bearer" })
      .send(fakeAnimalData)
      .expect(201);

    const res = await request(app)
      .get(`/api-v1/animal?name=Buddy`)
      .auth(token, { type: "bearer" })
      .expect(200);

    expect(res.body[0].name).toBe("Buddy");
  });

  it("Should retrieve animals filtered by size and gender", async () => {
    fakeAnimalData.user = account.user;
    await request(app)
      .post("/api-v1/animal")
      .auth(token, { type: "bearer" })
      .send(fakeAnimalData)
      .expect(201);

    const res = await request(app)
      .get(`/api-v1/animal?size=${AnimalSize.MEDIUM}&gender=${AnimalGender.MALE}`)
      .auth(token, { type: "bearer" })
      .expect(200);

    expect(res.body[0].size).toBe(AnimalSize.MEDIUM);
    expect(res.body[0].gender).toBe(AnimalGender.MALE);
  });

  it("Should retrieve all animals when no filters are applied", async () => {
    fakeAnimalData.user = account.user;
    await request(app)
      .post("/api-v1/animal")
      .auth(token, { type: "bearer" })
      .send(fakeAnimalData)
      .expect(201);

    const res = await request(app)
      .get(`/api-v1/animal`)
      .auth(token, { type: "bearer" })
      .expect(200);

  });

  it("Should retrieve animals sorted by name in descending order", async () => {
    fakeAnimalData.user = account.user;
    await request(app)
      .post("/api-v1/animal")
      .auth(token, { type: "bearer" })
      .send(fakeAnimalData)
      .expect(201);

    const res = await request(app)
      .get(`/api-v1/animal?sort=name:desc`)
      .auth(token, { type: "bearer" })
      .expect(200);

    expect(res.body[0].name).toBe("Buddy"); 
  });

  afterAll(async () => {
    await connection.destroy();
  });
});
