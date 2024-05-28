const request = require("supertest");

import app from "@shared/infra/http/config/app";
import { AddressRepositoryInMemory } from "../../infra/repositories/in-memory/AddressRepositoryInMemory";
import { AddressUseCase } from "./AddressUseCase";
import { AppError } from "@shared/infra/errors/AppError";

describe("Authenticate User", () => {
  let repository: AddressRepositoryInMemory;
  let addressUserCase: AddressUseCase

  beforeEach(() => {
    repository = new AddressRepositoryInMemory();
    addressUserCase = new AddressUseCase(repository);
  });

  it("should be save address correct data", async () => {
    await addressUserCase.execute({
      street: "Rua",
      complement: "Arvore",
      district: "Centro",
      postal_code: "7567000",
      city: {
        id: 1,
        name: "Morrinhos"
      },
    });
  });

  it("should be save address incorrect", async () => {
    expect(async () => {
      await addressUserCase.execute({
        street: "Rua",
        complement: "Arvore",
        district: "",
        postal_code: "",
        city: {
          id: 1,
          name: "Morrinhos"
        },
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be save address correct data duplication", async () => {
    await addressUserCase.execute({
      street: "Rua",
      complement: "Arvore",
      district: "Centro",
      postal_code: "7567000",
      city: {
        id: 1,
        name: "Morrinhos"
      },
    });
    await addressUserCase.execute({
      street: "Rua",
      complement: "Arvore",
      district: "Centro",
      postal_code: "7567000",
      city: {
        id: 1,
        name: "Morrinhos"
      },
    });
  });

  it("route", async () => {
    await request(app).get("/api-v1/register/").expect(200);
  });
});
