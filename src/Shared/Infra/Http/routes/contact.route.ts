import { Router } from "express";

import { ListContactController } from "@modules/contacts/useCases/contact/list/Contact.controller";
import { CreateContactController } from "@modules/contacts/useCases/contact/create/Contact.controller";
import { UpdateContactController } from "@modules/contacts/useCases/contact/update/Contact.controller";
import { DeleteContactController } from "@modules/contacts/useCases/contact/delete/Contact.controller";

import { authenticated } from "../middleware/authenticated.middleware";

export default (router: Router): void => {
  router.get("/contact", authenticated, ListContactController.handle);
  router.post("/contact", authenticated, CreateContactController.handle);
  router.put("/contact", authenticated, UpdateContactController.handle);
  router.delete("/contact", authenticated, DeleteContactController.handle);
};