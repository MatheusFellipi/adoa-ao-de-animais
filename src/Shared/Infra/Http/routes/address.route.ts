import { AddressUseCaseController } from "@modules/address/useCases/create/AddressUseCaseController";
import { UpdateUserController } from "@modules/user/useCases/update/UpdateUserController";

import { Router } from "express";
import { authenticated } from "../middleware/authenticated.middleware";

export default (router: Router): void => {
  router.post("/address", AddressUseCaseController.handle);
  router.put( "/address/:id", authenticated, UpdateUserController.handle);
}