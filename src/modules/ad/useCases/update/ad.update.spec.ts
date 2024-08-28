import request from "supertest";
import app from "@shared/infra/http/config/app";

import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { UserTestSeeder } from "@shared/infra/typeorm/seeds/User.Test.seed";
import { AnimalModel } from "@modules/animal/model/animal";
import { AnimalGender, AnimalSize } from "@modules/animal/enum/animal.enum";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import { AnimalAdType } from "@modules/ad/enums/animalAd.enum";
import { AnimalAd } from "@modules/ad/infra/typeorm/entities/Ad.entity";

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

describe("Test create ad animals", () => {
  let connection: DataSource;
  let token: string;
  let animal: Animal;
  let ad_animal: AnimalAd;

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
    token = res.body.token;
    const res_animal = await request(app)
      .post("/api-v1/animal/")
      .auth(res.body.token, { type: "bearer" })
      .send(fakeAnimalData)
      .expect(201);
    animal = res_animal.body;
    const res_ad_animal = await request(app)
      .post(`/api-v1/ad/animal/`)
      .auth(token, { type: "bearer" })
      .send({
        title: "Adoção cachorro",
        description: "um cachorro",
        type: AnimalAdType.ADOPTION,
        animal: res_animal.body,
      })
      .expect(201);
    ad_animal = res_ad_animal.body;
  }, 30000);

  it("should respond with a 401 if create ad animal", async () => {
    const res = await request(app)
      .get(`/api-v1/ad/animal/${ad_animal.id}/`)
      .expect(401);
    expect(res.body).not.toBeNull();
  }, 30000);

  it("should respond with a 401 if create  ad animal", async () => {
    const res = await request(app)
      .put(`/api-v1/ad/animal/${ad_animal.id}`)
      .send({
        title: "Adoção up",
        description: "um cachorro",
        type: AnimalAdType.ADOPTION,
        animal,
      })
      .expect(401);
    expect(res.body).not.toBeNull();
  }, 30000);

  it("should respond with a 200 if create  ad animal", async () => {
    const res = await request(app)
      .put(`/api-v1/ad/animal/${ad_animal.id}`)
      .auth(token, { type: "bearer" })
      .send({
        title: "Adoção up",
        description: "um cachorro",
        type: AnimalAdType.ADOPTION,
        animal,
      })
      .expect(200);
    expect(res.body).not.toBeNull();
    expect(res.body.title).toBe("Adoção up")
  }, 30000);
});
