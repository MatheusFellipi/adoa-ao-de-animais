import { AddressUseCaseController } from "@modules/address/useCases/create/AddressUseCaseController";
import { Router } from "express";

export default (router: Router): void => {
  router.post("/address", AddressUseCaseController.handle);
}