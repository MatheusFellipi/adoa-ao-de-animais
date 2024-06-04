import { Router } from "express";

import { CreateUserController } from "@modules/user/useCases/create/CreateUserController";
import uploadConfig from "@config/upload";

const avatar = uploadConfig.uploadS3("./tmp/avatar");


export default (router: Router): void => {
  // router.post("/user", avatar.single("avatar"), CreateUserController.handle);
  router.put( "/user", avatar.single("avatar"), UpdateUserController.handle);
}