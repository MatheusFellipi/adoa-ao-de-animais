import { Router } from "express";

import { authenticated } from "../middleware/authenticated.middleware";
import { LoginController } from "@modules/authenticated/useCase/login/Login.Controller";
import { RefreshTokenController } from "@modules/authenticated/useCase/refreshToken/Refresh.Controller";
import { LogoutController } from "@modules/authenticated/useCase/logout/Login.Controller";

export default (router: Router): void => {
  router.post("/auth", LoginController.handle);
  router.get("/refreshToken", RefreshTokenController.handle);
  router.delete("/refreshToken", authenticated, LogoutController.handle);
};
