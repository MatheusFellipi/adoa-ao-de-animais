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
  });

  it("Not should list account, not authenticated, not token header", async () => {
    const res = await request(app)
      .get("/api-v1/account")
      .auth(user.token, { type: "bearer" });
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
