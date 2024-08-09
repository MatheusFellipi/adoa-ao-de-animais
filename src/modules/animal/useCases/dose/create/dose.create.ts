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
import { DoseModel } from "@modules/animal/model/doseModelView";
import { VaccinationCard } from "@modules/animal/infra/typeorm/entities/VaccinationCard.entity";

jest.setTimeout(30000);

const fakeVaccinationCardModel: DoseModel = {
  description: "Dose Única",
  vaccination_card_id: "",
  vaccination_date: new Date("2024-08-01"),
  crmv: "123456",
  vaccination: {
    name: "Vacina Antirrábica",
    description: "Vacina para prevenção da raiva em animais.",
  },
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

const fakeDose: DoseModel = {
  description: "Dose Única",
  vaccination_date: new Date(2024, 8, 1),
  crmv: "123456",
  vaccination_card_id: "",
  vaccination: {
    name: "Vacina Antirrábica",
    description: "Vacina para prevenção da raiva em animais.",
  },
};

describe("Test Vaccination cards", () => {
  let connection: DataSource;
  let token: string;
  let animal: Animal;
  let card: VaccinationCard

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

    const res_card = await request(app)
    .post(`/api-v1/animal/vaccination-card`)
    .auth(token, { type: "bearer" })
    .send({ ...fakeVaccinationCardModel, animal_id: animal.id })
    .expect(201)
      card = res_card.body

  }, 30000);

  it("Should response 201 if created vaccination card animal", async () => {
    await request(app)
      .post(`/api-v1/animal/dose`)
      .auth(token, { type: "bearer" })
      .send({ ...fakeDose, vaccination_card_id: card.id })
      .expect(201)
  });

  it("Should response 401 if missing auth in request", async () => {
    await request(app)
      .post(`/api-v1/animal/dose`)
      .send({ ...fakeDose, vaccination_card_id: card.id })
      .expect(401);
  });

  it("Should response 400 if missing vaccination card id", async () => {
    await request(app)
      .post(`/api-v1/animal/dose`)
      .auth(token, { type: "bearer" })
      .send({ ...fakeDose })
      .expect(400);
  });
});
