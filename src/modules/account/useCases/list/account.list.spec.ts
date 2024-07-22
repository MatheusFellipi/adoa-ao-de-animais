import { AccountRepositoryInMemory } from "@modules/account/infra/repositories/in-memory/Account.repository.inMemory copy";
import { Account } from "@modules/account/infra/typeorm/entities/Account.entity";
import { TokenReturnModel } from "@modules/account/model/Token.modal";
import app from "@shared/infra/http/config/app";
import request from "supertest";

describe("test for create account", () => {
  let categoriesRepositoryInMemory: AccountRepositoryInMemory;
  let user: TokenReturnModel;

  beforeEach(async () => {
    categoriesRepositoryInMemory = new AccountRepositoryInMemory();

    const res = await request(app)
      .post("/api-v1/account")
      .send({
        "email": "cliente.teste.04@teste.com",
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
    user = res.body;
  });

  it("Not should list account, not authenticated, not token header", async () => {
    console.log(user.token);
    const res = await request(app)
      .get("/api-v1/account")
      .auth(user.token, { type: "bearer" });
    console.log(res.body);
    expect(res.statusCode).toBe(200);
  });

  it("Not should list account, not authenticated, not token header", async () => {
    request(app).get("/api-v1/account");
    const res = await request(app).get("/api-v1/account");
    expect(res.statusCode).toBe(401);
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe("o token esta faltando nos headers");
  });
});
