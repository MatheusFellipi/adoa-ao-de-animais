import { Router } from "express";

import { authenticated } from "../middleware/authenticated.middleware";

import { CreateAnimalController } from "@modules/animal/useCases/animal/create/CreateAnimalsController";
import { UpdateAnimalController } from "@modules/animal/useCases/animal/update/UpdateAnimalController";

import uploadConfig from "@config/upload";
const avatar = uploadConfig.uploadS3("./tmp/animal");

export default (router: Router): void => {
  router.post("/animal", authenticated, CreateAnimalController.handle);
  router.post("/animal/:id", authenticated, UpdateAnimalController.handle);
  router.post("/animal/photo/:id", authenticated, avatar.array("photos"), UpdateAnimalController.handle);
}