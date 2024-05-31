import { Router } from "express";

import { CreateUserController } from "@modules/user/useCases/create/CreateUserController";
import uploadConfig from "@config/upload";

const avatar = uploadConfig.upload("./tmp/avatar");


export default (router: Router): void => {
  router.post("/user", avatar.single("avatar"), CreateUserController.handle);
  // router.patch( "/avatar", avatar.single("avatar"), ensureAuthenticated, updateUseAvatarController.handle);
}