import { AccountRepositoryInMemory } from "@modules/account/infra/repositories/in-memory/Account.repository.inMemory copy";
import request from "supertest";

import app from "@shared/infra/http/config/app";

describe("test for create account", () => {
  let categoriesRepositoryInMemory: AccountRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new AccountRepositoryInMemory();
  });

  // it("should respond with a 201 for create account user", async () => {
  //   const res = await request(app).get("/test");
  //   expect(res.status).toBe(200);
  // });

  // it("should respond with a 201 for create account user", async () => {
  //   const res_auth = await request(app)
  //     .post("/api-v1/account")
  //     .send({
  //       email: "cliente.teste.01@teste.com",
  //       password: "password123123",
  //       user: {
  //         name: "John Doe",
  //         addresses: [
  //           {
  //             street: "123 Main St",
  //             district: "bairro",
  //             state: "CA",
  //             postal_code: "12345",
  //             complement: "complement",
  //             city: {
  //               id: 1,
  //               name: "Acrelândia",
  //             },
  //           },
  //         ],
  //         contacts: [
  //           {
  //             type: 1,
  //             name: "nome contato",
  //             phone: "555-1234",
  //           },
  //         ],
  //         links: [
  //           {
  //             url: "https://example.com",
  //             name: "Personal website",
  //           },
  //         ],
  //       },
  //     });

  //     // console.log(res_auth.body.token);
      
  //     console.log(categoriesRepositoryInMemory.getAll());
      
  //   const res = await request(app)
  //     .get("/api-v1/account")
  //     .auth(res_auth.body.token, {
  //       type: "bearer",
  //     });
  //     // console.log(res.body);

  //   expect(res.status).toBe(200);
  // });
});
