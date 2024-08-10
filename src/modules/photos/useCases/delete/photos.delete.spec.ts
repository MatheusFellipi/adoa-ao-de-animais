import request from "supertest";
import app from "@shared/infra/http/config/app";
import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { UserTestSeeder } from "@shared/infra/typeorm/seeds/User.Test.seed";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import { Photo } from "@modules/photos/infra/typeorm/entities/Photos.entity";
import { PhotoRepository } from "@modules/photos/infra/typeorm/repositories/Photo.repository";
import path from "path";

jest.setTimeout(60000);

const filePath = path.resolve(
  __dirname,
  "../../../../../resources/assets_test/b0b81847aa4ae96fc4165e8d81dc9d1f.jpg"
);

describe("Test delete photos", () => {
  let connection: DataSource;
  let token: string;
  let animal: Animal;
  let photo: Photo[];

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

    const res_animal = await request(app)
      .post("/api-v1/animal/")
      .auth(token, { type: "bearer" })
      .send({
        name: "Buddy",
        description: "A friendly and energetic dog.",
        origin: "Shelter",
        size: "MEDIUM",
        gender: "MALE",
        weight: "25kg",
        birthDate: new Date(2020, 5, 15),
        age: "3 years",
        microchipCode: "123456789",
      })
      .expect(201);

    animal = res_animal.body;

    await request(app)
      .patch(`/api-v1/animal/photos/${animal.id}`)
      .auth(token, { type: "bearer" })
      .attach("photos", filePath)
      .attach("photos", filePath)
      .expect(201);

    const res_photo = new PhotoRepository();
    photo = await res_photo.listByIdAnimal(animal.id);
  });

  it("should respond with a 401 if auth is missing for deleting photos", async () => {
    await request(app)
      .delete(`/api-v1/animal/photos/${animal.id}`)
      .send({
        photos: [photo[0].id, photo[1].id],
      })
      .expect(401);
  });

  it("should respond with a 200 if photos are successfully deleted", async () => {
    const res = await request(app)
      .delete(`/api-v1/animal/photos/${animal.id}`)
      .auth(token, { type: "bearer" })
      .send({
        photos_ids: [photo[0].id, photo[1].id],
      })
      .expect(204);
  });

  it("should respond with a 400 if photos array is empty", async () => {
    await request(app)
      .delete(`/api-v1/animal/photos/${animal.id}`)
      .auth(token, { type: "bearer" })
      .send({
        photos_ids: [],
      })
      .expect(400);
  });
});
