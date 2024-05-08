import { CreateUserController } from "@modules/user/useCases/create/CreateUserController";
import { Router } from "express";


const createUserController = new CreateUserController()

export default (router: Router): void => {
  router.post("/user", createUserController.handle);
}