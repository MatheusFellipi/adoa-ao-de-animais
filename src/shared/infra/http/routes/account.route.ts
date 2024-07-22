import { Router } from "express";

import { ListAccountController } from "@modules/account/useCases/list/Account.Controller";
import { authenticated } from "../middleware/authenticated.middleware";
import { CreateAccountController } from "@modules/account/useCases/create/Account.Controller";

export default (router: Router): void => {
  router.post("/account", CreateAccountController.handle);
  router.get("/account", authenticated, ListAccountController.handle);
}