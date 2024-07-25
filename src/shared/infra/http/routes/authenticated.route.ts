import { Router } from "express";

import { authenticated } from "../middleware/authenticated.middleware";
import { LoginController } from "@modules/authenticated/useCase/login/Login.Controller";
import { LogoutController } from "@modules/authenticated/useCase/logout/Logout.Controller";

export default (router: Router): void => {
  router.post("/auth", LoginController.handle);
  router.post("/logout", authenticated, LogoutController.handle);
};
