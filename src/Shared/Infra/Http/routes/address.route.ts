import { Router } from "express";
import { authenticated } from "../middleware/authenticated.middleware";

import { UpdateAddressController } from "@modules/address/useCases/update/Address.Controller";
import { AddressUseCaseController } from "@modules/address/useCases/create/Address.Controller";
import { DeleteAddressController } from "@modules/address/useCases/delete/Address.Controller";
import { AddressListController } from "@modules/address/useCases/list/Address.Controller";

export default (router: Router): void => {
  router.get("/address", authenticated, AddressListController.handle);
  router.post("/address", authenticated, AddressUseCaseController.handle);
  router.put("/address/:id/", authenticated, UpdateAddressController.handle);
  router.delete("/address/:id/", authenticated, DeleteAddressController.handle);
};
