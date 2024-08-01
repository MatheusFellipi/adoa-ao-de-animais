import request from "supertest";
import app from "@shared/infra/http/config/app";
import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { AccountRepository } from "@modules/account/infra/typeorm/repositories/Account.repository";

jest.setTimeout(30000);

describe("test for delete account", () => {
  let connection: DataSource;
  let respo: AccountRepository;

  beforeAll(async () => {
    connection = await dbContext.initialize();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  beforeEach(async () => {
    await runSeeders(connection, {
      seeds: [MainSeeder],
    });
    respo = new AccountRepository();
  }, 30000);

  it("should respond with a 201 for create account user", async () => {
    await request(app)
      .post("/api-v1/account")
      .send({
        email: "cliente.teste.01@teste.com",
        password: "Password@123123",
        user: {
          name: "Example Organization",
          avatar: "https://example.com/avatar.jpg",
          description: "An example organization description.",
          type: 1,
          cnpj_cpf: "12345678901234",
          operation_at: "2023-01-01T09:00:00Z",
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
        },
      })
      .expect(201);

    const res = await request(app)
      .post("/api-v1/auth")
      .send({
        email: "cliente.teste.01@teste.com",
        password: "Password@123123",
      })
      .expect(200);

    const sss = await request(app)
      .delete("/api-v1/account")
      .auth(res.body.token, { type: "bearer" });
    console.log(sss);

    const exist = await respo.findExistsBy("cliente.teste.01@teste.com");
    expect(exist).toBe(false);
  }, 30000);

  it("should not respond with a 200 if auth missing", async () => {
    await request(app).delete("/api-v1/account").expect(401);
  }, 30000);
});
