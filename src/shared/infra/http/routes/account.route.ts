import { Router } from "express";

import { authenticated } from "../middleware/authenticated.middleware";

import { CreateAccountController } from "@modules/account/useCases/create/Account.Controller";
import { DeleteAccountController } from "@modules/account/useCases/delete/Account.Controller";
import { ListAccountController } from "@modules/account/useCases/list/Account.Controller";

export default (router: Router): void => {
  router.post("/account", CreateAccountController.handle);
  router.get("/account/profile", authenticated, ListAccountController.handle);
  router.delete("/account", authenticated, DeleteAccountController.handle);
};
