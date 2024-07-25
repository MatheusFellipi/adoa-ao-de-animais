import { Router } from "express";

import { UpdateUserController } from "@modules/user/useCases/update/UpdateUserController";
import { authenticated } from "../middleware/authenticated.middleware";

import uploadConfig from "@shared/config/upload";
const avatar = uploadConfig.upload("./tmp/avatar");

export default (router: Router): void => {
  router.put( "/user", authenticated, avatar.single("avatar"), UpdateUserController.handle);
}