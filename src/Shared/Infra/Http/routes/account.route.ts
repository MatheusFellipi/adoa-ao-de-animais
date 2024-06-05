import { Router } from "express";

import { CreateAccountController } from "@modules/account/useCases/create/CreateAccountController";
import { createAccountMiddleware } from "../middleware/createAccount.middleware";

export default (router: Router): void => {
  router.post("/account", createAccountMiddleware, CreateAccountController.handle);
}