import { Router } from "express";

import { LinkUpdateController } from "@modules/contacts/useCases/link/update/Link.controller";
import { CreateLinkController } from "@modules/contacts/useCases/link/create/Link.controller";
import { LinkListController } from "@modules/contacts/useCases/link/list/Link.controller";
import { DeleteLinkController } from "@modules/contacts/useCases/link/delete/Link.controller";

import { authenticated } from "../middleware/authenticated.middleware";

export default (router: Router): void => {
  router.get("/link", authenticated, LinkListController.handle);
  router.post("/link", authenticated, CreateLinkController.handle);
  router.put("/link/:id/", authenticated, LinkUpdateController.handle);
  router.delete("/link/:id/", authenticated, DeleteLinkController.handle);
};