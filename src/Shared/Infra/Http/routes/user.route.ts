import { CreateUserController } from "@modules/user/useCases/create/CreateUserController";
import { Router } from "express";

export default (router: Router): void => {
  router.post("/user", CreateUserController.handle);
}