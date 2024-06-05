
import { Router } from "express";
import { authenticated } from "../middleware/authenticated.middleware";

import { AddressUseCaseController } from "@modules/address/useCases/create/AddressUseCaseController";
import { UpdateAddressController } from "@modules/address/useCases/update/UpdateAddressController";

export default (router: Router): void => {
  router.post("/address", AddressUseCaseController.handle);
  router.put( "/address/:id/", authenticated, UpdateAddressController.handle);
}