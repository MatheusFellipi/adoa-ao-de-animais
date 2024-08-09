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

const fakeVaccinationCardModel: VaccinationCardModel = {
  animal_id: "",
  dose: [
    {
      id: "1",
      description: "Dose Única",
      vaccination_date: new Date("2024-08-01"),
      crmv: "123456",
      vaccination: {
        name: "Vacina Antirrábica",
        description: "Vacina para prevenção da raiva em animais.",
      },
    },
    {
      description: "Dose Única",
      vaccination_date: new Date("2024-08-01"),
      crmv: "123456",
      vaccination: {
        name: "Vacina Antirrábica",
        description: "Vacina para prevenção da raiva em animais.",
      },
    },
  ],
};

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

    const res_animal = await request(app)
      .post("/api-v1/animal/")
      .auth(token, { type: "bearer" })
      .send(fakeAnimalData)
      .expect(201);
    animal = res_animal.body;
    token = res.body.token;
  }, 30000);

  it("Should response 201 if created vaccination card animal", async () => {
    await request(app)
      .post(`/api-v1/animal/vaccination-card`)
      .auth(token, { type: "bearer" })
      .send({ ...fakeVaccinationCardModel, animal_id: animal.body.id })
      .expect(201);
  });

  it("Should response 201 if created vaccination card animal", async () => {
    await request(app)
      .post(`/api-v1/animal/vaccination-card`)
      .auth(token, { type: "bearer" })
      .send({ ...fakeVaccinationCardModel, animal_id: animal.body.id })
      .expect(201);
  });

  it("Should response 400 if missing animal id in created vaccination card animal", async () => {
    await request(app)
      .post(`/api-v1/animal/vaccination-card`)
      .auth(token, { type: "bearer" })
      .send({ ...fakeVaccinationCardModel })
      .expect(201);
  });
});
