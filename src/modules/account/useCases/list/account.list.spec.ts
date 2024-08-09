import request from "supertest";
import app from "@shared/infra/http/config/app";
import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";

jest.setTimeout(30000);

describe("Account list", () => {
  let connection: DataSource;
  let token: string;

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
    const res = await request(app)
      .post("/api-v1/account/profile")
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
      });
    token = res.body.token;
  }, 30000);

  it("should respond with a 200 if list user logged", async () => {
    const res = await request(app)
      .get("/api-v1/account/profile")
      .auth(token, { type: "bearer" })
      .expect(200);
    expect(res.body).not.toBeNull();
    expect(res.body.password).toBe(undefined);
    expect(res.body.user).not.toBeNull();
  }, 30000);

  it("should not respond with a 200 if auth missing", async () => {
    const res = await request(app).get("/api-v1/account/profile").expect(401);
    expect(res.body.message).toBe("o token esta faltando nos headers");
  }, 30000);
});
