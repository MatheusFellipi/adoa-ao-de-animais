import { Router } from "express";
import { CreateAccountController } from "@modules/account/useCases/create/CreateAccountController";

export default (router: Router): void => {
  router.post("/account", CreateAccountController.handle);
}