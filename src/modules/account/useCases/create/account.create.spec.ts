import request from "supertest";
import app from "@shared/infra/http/config/app";
import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { AccountRepository } from "@modules/account/infra/typeorm/repositories/Account.repository";

jest.setTimeout(30000);

describe("test for create account", () => {
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
    const res = await request(app)
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
      });
      
    const exits = await respo.findExistsBy(res.body.email)
    expect(res.status).toBe(201);
    expect(res.body).not.toBeNull();
    expect(exits).toBe(true);
  }, 30000);

  it("should not respond with a 201 for duplicate user creation", async () => {
    await request(app)
      .post("/api-v1/account")
      .send({
        email: "cliente.teste.02@teste.com",
        password: "Password@123123",
        user: {
          name: "Example Organization",
          avatar: "https://example.com/avatar.jpg",
          description: "An example organization description.",
          type: 1,
          cnpj_cpf: "123451238901234",
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
    await request(app)
      .post("/api-v1/account")
      .send({
        email: "cliente.teste.02@teste.com",
        password: "Password@123123",
        user: {
          name: "Example Organization",
          avatar: "https://example.com/avatar.jpg",
          description: "An example organization description.",
          type: 1,
          cnpj_cpf: "123678901234",
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
      .expect(400);
  }, 30000);

  it("Should not respond with a 201 if email and password are missing.", async () => {
    const res = await request(app)
      .post("/api-v1/account")
      .send({
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
      .expect(400);
    expect(res.body.message).toBe(
      "O email não pode estar vazio,O email deve ser um endereço de email válido, A senha não pode estar vazia,A senha não é forte o suficiente"
    );
  }, 30000);

  it("should not respond with a 201 if user is missing", async () => {
    const res = await request(app)
      .post("/api-v1/account")
      .send({
        email: "cliente.teste.01@teste.com",
        password: "Password@123123",
      })
      .expect(400);
    expect(res.body.message).toBe("O usuário não pode estar vazio");
  }, 30000);

  it("should not respond with a 201 if cpf and cnpj duplicate", async () => {
    await request(app)
      .post("/api-v1/account")
      .send({
        email: "cliente.teste.04@teste.com",
        password: "Password@123123",
        user: {
          name: "Example Organization",
          avatar: "https://example.com/avatar.jpg",
          description: "An example organization description.",
          type: 1,
          cnpj_cpf: "1234567890",
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
      }).expect(201)
      
    const res = await request(app)
      .post("/api-v1/account")
      .send({
        email: "cliente.teste.05@teste.com",
        password: "Password@123123",
        user: {
          name: "Example Organization",
          avatar: "https://example.com/avatar.jpg",
          description: "An example organization description.",
          type: 1,
          cnpj_cpf: "1234567890",
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
      .expect(400);
    expect(res.body.message).toBe("A conta ja exite come esse cpf/cnpj");
  }, 30000);
});
