import { AccountRepositoryInMemory } from "@modules/account/infra/repositories/in-memory/Account.repository.inMemory copy";
import request from "supertest";

import app from "@shared/infra/http/config/app";

describe("test for create account", () => {
  let categoriesRepositoryInMemory: AccountRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new AccountRepositoryInMemory();
  });

  it("should respond with a 201 for create account user", async () => {
    const res = await request(app).get("/test");
    expect(res.status).toBe(200);
  });

  it('should respond with a 201 for create account user', async () => {
    const res = await request(app)
      .post("/api-v1/account")
      .send({
        "email": "cliente.teste.01@teste.com",
        "password": "password123123",
        "user": {
          "name": "John Doe",
          "addresses": [
            {
              "street": "123 Main St",
              "district": "bairro",
              "state": "CA",
              "postal_code": "12345",
              "complement": "complement",
              "city": {
                "id": 1,
                "name": "Acrelândia"
              }
            }
          ],
          "contacts": [
            {
              "type": 1,
              "name": "nome contato",
              "phone": "555-1234"
            }
          ],
          "links": [
            {
              "url": "https://example.com",
              "name": "Personal website"
            }
          ]
        }
      })

    expect(res.statusCode).toBe(201);
    expect(res.body).not.toBeNull();
    expect(res.body.token).not.toBeNull();
    expect(res.body.email).not.toBeNull();
    expect(res.body.name).not.toBeNull();
    expect(categoriesRepositoryInMemory.findByEmail(res.body.email)).not.toBeNull();
  });

  it('Not should create account user duplicate', async () => {
    const res = await request(app)
      .post("/api-v1/account")
      .send({
        "email": "cliente.test@teste.com",
        "password": "password123123",
        "user": {
          "name": "John Doe",
          "addresses": [
            {
              "street": "123 Main St",
              "district": "bairro",
              "state": "CA",
              "postal_code": "12345",
              "complement": "complement",
              "city": {
                "id": 1,
                "name": "Acrelândia"
              }
            }
          ],
          "contacts": [
            {
              "type": 1,
              "name": "nome contato",
              "phone": "555-1234"
            }
          ],
          "links": [
            {
              "url": "https://example.com",
              "name": "Personal website"
            }
          ]
        }
      })
      .expect('Content-Type', /json/)
      .expect(201);

      expect(res.statusCode).toBe(201);
      expect(categoriesRepositoryInMemory.findByEmail(res.body.email)).not.toBeNull();

      const resDuplicate = await request(app)
      .post("/api-v1/account")
      .send({
        "email": "cliente.test@teste.com",
        "password": "password123123",
        "user": {
          "name": "John Doe",
          "addresses": [
            {
              "street": "123 Main St",
              "district": "bairro",
              "state": "CA",
              "postal_code": "12345",
              "complement": "complement",
              "city": {
                "id": 1,
                "name": "Acrelândia"
              }
            }
          ],
          "contacts": [
            {
              "type": 1,
              "name": "nome contato",
              "phone": "555-1234"
            }
          ],
          "links": [
            {
              "url": "https://example.com",
              "name": "Personal website"
            }
          ]
        }
      })
      .expect(400);
      expect(resDuplicate.statusCode).toBe(400);
  });
});
