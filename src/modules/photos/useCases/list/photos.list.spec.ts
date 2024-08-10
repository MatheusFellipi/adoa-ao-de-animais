import request from "supertest";
import app from "@shared/infra/http/config/app";
import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { AnimalGender, AnimalSize } from "@modules/animal/enum/animal.enum";
import { UserTestSeeder } from "@shared/infra/typeorm/seeds/User.Test.seed";
import { AnimalModel } from "@modules/animal/model/animal";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import path from "path";
const filePath = path.resolve(
  __dirname,
  "../../../../../resources/assets_test/b0b81847aa4ae96fc4165e8d81dc9d1f.jpg"
);

jest.setTimeout(30000);

describe("Test List Animal Photos", () => {
  let connection: DataSource;
  let token: string;
  let animal: Animal;

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

    const res_animal = await request(app)
      .post("/api-v1/animal/")
      .auth(token, { type: "bearer" })
      .send(fakeAnimalData)
      .expect(201);
    animal = res_animal.body;

    await request(app)
      .patch(`/api-v1/animal/photos/${animal.id}`)
      .auth(token, { type: "bearer" })
      .attach("photos", filePath)
      .attach("photos", filePath)
      .expect(201);
  });

  it("Should list photos of an animal", async () => {
    const res = await request(app)
      .get(`/api-v1/animal/photos/${animal.id}`)
      .auth(token, { type: "bearer" })
      .expect(200);

    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty("url");
  });

  it("Should return 401 if no auth token is provided", async () => {
    await request(app)
      .get(`/api-v1/animal/photos/${animal.id}`)
      .expect(401);
  });
});
