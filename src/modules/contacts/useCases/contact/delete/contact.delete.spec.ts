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

describe("Test delete contacts", () => {
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

  it("should not respond with a 204 if auth missing delete contacts", async () => {
    const res = await request(app)
      .delete(`/api-v1/contact/${contact[0].id}/`)
      .expect(401);
    expect(res.body).not.toBeNull();
  }, 30000);

  it("should respond with a 200 if update contact", async () => {
    const res = await request(app)
      .delete(`/api-v1/contact/${contact[0].id}/`)
      .auth(token, { type: "bearer" })
      .expect(200);
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe("O contado foi excluída permanentemente");
  }, 30000);

  it("should not respond with a 204 if delete contacts not exits", async () => {
    const res = await request(app)
      .delete(`/api-v1/contact/1231231231/`)
      .auth(token, { type: "bearer" })
      .expect(400);
    expect(res.body).not.toBeNull();
    expect(res.body.message).toBe("Não foi possível deletar o contado");
  }, 30000);
});
