import { Router } from "express";

import { ListLinkController } from "@modules/contacts/useCases/link/update/Link.controller";
import { CreateLinkController } from "@modules/contacts/useCases/link/create/Link.controller";
import { UpdateLinkController } from "@modules/contacts/useCases/link/list/Link.controller";
import { DeleteLinkController } from "@modules/contacts/useCases/link/delete/Link.controller";

import { authenticated } from "../middleware/authenticated.middleware";

export default (router: Router): void => {
  router.get("/link", authenticated, ListLinkController.handle);
  router.post("/link", authenticated, CreateLinkController.handle);
  router.put("/link", authenticated, UpdateLinkController.handle);
  router.delete("/link", authenticated, DeleteLinkController.handle);
};