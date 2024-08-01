import request from "supertest";
import app from "@shared/infra/http/config/app";
import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { AccountRepository } from "@modules/account/infra/typeorm/repositories/Account.repository";
import { UserTestSeeder } from "@shared/infra/typeorm/seeds/User.Test.seed";
import { Account } from "@modules/account/infra/typeorm/entities/Account.entity";
import { AddressRepository } from "@modules/address/infra/typeorm/repositories/address.repository";
import { Address } from "@modules/address/infra/typeorm/entities/Address.entity";

jest.setTimeout(30000);

describe("Test update user dadas", () => {
  let connection: DataSource;
  let respo: AccountRepository;
  let address_respo: AddressRepository;
  let user: Account;
  let address: Address[];
  let token: string;

  beforeAll(async () => {
    connection = await dbContext.initialize();
  });

  afterAll(async () => {
    await connection.destroy();
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
    respo = new AccountRepository();
    address_respo = new AddressRepository();
    user = await respo.findByEmail("cliente.teste.99@teste.com");
    address = await address_respo.find(user.user.id);
  }, 30000);

  it("should respond with a 200 if create address", async () => {
    const res = await request(app)
      .post(`/api-v1/address/`)
      .auth(token, { type: "bearer" })
      .send({
        street: "123 Update",
        district: "update",
        postal_code: "54321",
        complement: "update",
        city: {
          id: 1,
          name: "Acrelândia",
        },
      }).expect(201)
      expect(res.body).not.toBeNull()
      expect(res.body.street).not.toBe(address[0].street)
      expect(res.body.district).not.toBe(address[0].district)
      expect(res.body.postal_code).not.toBe(address[0].postal_code)
      expect(res.body.complement).not.toBe(address[0].complement)
  }, 30000);

  it("should respond with a 200 if auth missing create address", async () => {
    const res = await request(app)
      .post(`/api-v1/address/`)
      .send({
        street: "123 Update",
        district: "update",
        postal_code: "54321",
        complement: "update",
        city: {
          id: 1,
          name: "Acrelândia",
        },
      }).expect(401)
  }, 30000);

});
