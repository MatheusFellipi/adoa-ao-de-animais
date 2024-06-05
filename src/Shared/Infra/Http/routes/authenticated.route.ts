import { Router } from "express";

import { AuthenticatedAccountController } from "@modules/account/useCases/authenticated/AuthenticatedAccountController";

export default (router: Router): void => {
  router.post("/authenticated", AuthenticatedAccountController.handle);
}