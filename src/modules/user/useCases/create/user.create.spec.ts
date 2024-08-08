import "reflect-metadata"
import "@shared/infra/tsyringe/index"
import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { CreateUserController } from "@modules/user/useCases/create/User.Controller";

jest.setTimeout(30000);

describe("Test use case, created user ", () => {
  let connection: DataSource;

  beforeAll(async () => {
    connection = await dbContext.initialize();
  });

  beforeEach(async () => {
    await runSeeders(connection, {
      seeds: [MainSeeder],
    });
  }, 50000);

  it("should create user and return user model", async () => {
    const user = {
      name: "Example Organization",
      avatar: "https://example.com/avatar.jpg",
      description: "An example organization description.",
      type: 1,
      cnpj_cpf: "123456789014",
      addresses: [
        {
          street: "123 Main St",
          district: "bairro",
          state: "CA",
          postal_code: "12345",
          complement: "complement",
          city: {
            id: 1,
            name: "Acrelândia",
          },
        },
      ],
      contacts: [
        {
          type: 1,
          name: "nome contato",
          phone: "555-1234",
        },
      ],
      links: [
        {
          url: "https://example.com",
          name: "Personal website",
        },
      ],
    };
    const data = CreateUserController.handleInternal(user);
    expect(data).not.toBeNull()
  }, 30000);
});
