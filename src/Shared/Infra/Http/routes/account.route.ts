import { Router } from "express";

import { CreateAccountController } from "@modules/account/useCases/create/CreateAccountController";
import { createAccountMiddleware } from "../middleware/createAccount.middleware";
import { ListAccountController } from "@modules/account/useCases/list/Account.Controller";
import { authenticated } from "../middleware/authenticated.middleware";

export default (router: Router): void => {
  router.post("/account", createAccountMiddleware, CreateAccountController.handle);
  router.get("/account", authenticated, ListAccountController.handle);
}