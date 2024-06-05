import { Router } from "express";
import uploadConfig from "@config/upload";

import { authenticated } from "../middleware/authenticated.middleware";

import { CreatePhotosController } from "@modules/photos/useCases/create/CreatePhotosController";

import { CreateAnimalController } from "@modules/animal/useCases/animal/create/CreateAnimalsController";
import { UpdateAnimalController } from "@modules/animal/useCases/animal/update/UpdateAnimalController";
import { DeleteAnimalController } from "@modules/animal/useCases/animal/delete/DeleteAnimalController";

import { CreatePhotosAnimalController } from "@modules/animal/useCases/animal/createPhotos/CreatePhotosAnimalsController";

const avatar = uploadConfig.upload("./tmp/animal");

export default (router: Router): void => {
  router.post("/animal", authenticated, CreateAnimalController.handle);
  
  router.put("/animal/:id", authenticated, UpdateAnimalController.handle);
  router.delete("/animal/:id", authenticated, DeleteAnimalController.handle);

  router.post("/animal/photos/:id_animal", authenticated, avatar.array("photos"), CreatePhotosController.handle);
  router.delete("/animal/photo/:id_photo", authenticated, UpdateAnimalController.handle);
}