import request from "supertest";
import app from "@shared/infra/http/config/app";

import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { AnimalGender, AnimalSize } from "@modules/animal/enum/animal.enum";
import { UserTestSeeder } from "@shared/infra/typeorm/seeds/User.Test.seed";
import { VaccinationCardModel } from "@modules/animal/model/vaccinationCard";
import { AnimalModel } from "@modules/animal/model/animal";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";

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

describe("Test Vaccination cards", () => {
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
    
    const res_animal = await request(app)
      .post("/api-v1/animal/")
      .auth(res.body.token, { type: "bearer" })
      .send(fakeAnimalData)
      .expect(201);
    
    animal = res_animal.body;
  }, 30000);

  it("Should upload photos successfully for a valid animal and respond with 201", async () => {
    await request(app)
      .patch(`/api-v1/animal/photos/${animal.id}`)
      .auth(token, { type: "bearer" })
      .attach('photos', '../../../../../resources/assets_test/b0b81847aa4ae96fc4165e8d81dc9d1f.jpg')
      .attach('photos', '../../../../../resources/assets_test/b0b81847aa4ae96fc4165e8d81dc9d1f.jpg')
      .expect(201);
  });
  
  it("Should respond with 401 if trying to upload photos without authentication", async () => {
    await request(app)
      .patch(`/api-v1/animal/photos/${animal.id}`)
      .attach('photos', '../../../../../resources/assets_test/b0b81847aa4ae96fc4165e8d81dc9d1f.jpg')
      .expect(401);
  });

  it("Should respond with 400 if no photos are uploaded", async () => {
    await request(app)
      .patch(`/api-v1/animal/photos/${animal.id}`)
      .auth(token, { type: "bearer" })
      .expect(400);
  });

  it("Should respond with 400 if trying to upload photos with an invalid animal_id", async () => {
    await request(app)
      .patch(`/api-v1/animal/photos/invalid_animal_id`)
      .auth(token, { type: "bearer" })
      .attach('photos', '../../../../../resources/assets_test/b0b81847aa4ae96fc4165e8d81dc9d1f.jpg')
      .expect(400);
  });
    
});
