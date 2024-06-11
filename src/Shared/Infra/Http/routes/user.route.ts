import { Router } from "express";

import { UpdateUserController } from "@modules/user/useCases/update/UpdateUserController";
import { DeleteUserController } from "@modules/user/useCases/delete/User.Controller";

import { authenticated } from "../middleware/authenticated.middleware";

import uploadConfig from "@config/upload";
const avatar = uploadConfig.upload("./tmp/avatar");

export default (router: Router): void => {
  router.put( "/user", authenticated, avatar.single("avatar"), UpdateUserController.handle);
  router.delete( "/user", authenticated, DeleteUserController.handle);
}