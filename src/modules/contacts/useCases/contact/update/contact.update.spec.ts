import request from "supertest";
import app from "@shared/infra/http/config/app";

import { DataSource } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { runSeeders } from "typeorm-extension";
import { MainSeeder } from "@shared/infra/typeorm/seeds/Main.seed";
import { AccountRepository } from "@modules/account/infra/typeorm/repositories/Account.repository";
import { UserTestSeeder } from "@shared/infra/typeorm/seeds/User.Test.seed";
import { Account } from "@modules/account/infra/typeorm/entities/Account.entity";
import { Contact } from "@modules/contacts/infra/typeorm/entities/Contact.entity";
import { ContactRepository } from "@modules/contacts/infra/typeorm/repositories/contact.repository";

jest.setTimeout(30000);

describe("Test create contacts", () => {
  let connection: DataSource;

  let account: Account;
  let contact: Contact[];
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
    const resAccount = new AccountRepository();
    const resContact = new ContactRepository();
    account = await resAccount.findByEmail("cliente.teste.99@teste.com");
    contact = await resContact.listAllByAccountID(account.user.id);
  }, 30000);

  it("should respond with a 200 if update contact", async () => {
    const res = await request(app)
      .put(`/api-v1/contact/${contact[0].id}/`)
      .auth(token, { type: "bearer" })
      .send({
        type: 1,
        name: "nome att",
        phone: "555-1234",
      })
      .expect(200);
    expect(res.body).not.toBeNull();
  }, 30000);

  it("should respond with a 200 if auth missing create contacts", async () => {
    const res = await request(app)
      .put(`/api-v1/contact/${contact[0].id}/`)
      .send({
        type: 1,
        name: "nome att",
        phone: "555-1234",
      })
      .expect(401);
    expect(res.body).not.toBeNull();
  }, 30000);

  it("should respond with a 200 if phone missing create contact", async () => {
    const res = await request(app)
      .put(`/api-v1/contact/${contact[0].id}/`)
      .auth(token, { type: "bearer" })
      .send({
        type: 1,
        name: "nome contato",
      })
      .expect(400);
    expect(res.body).not.toBeNull();
  }, 30000);
});
