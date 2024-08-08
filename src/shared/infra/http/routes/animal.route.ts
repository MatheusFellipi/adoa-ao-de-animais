import { Router } from "express";
import { authenticated } from "../middleware/authenticated.middleware";

import { CreateAnimalController } from "@modules/animal/useCases/animal/create/Animal.Controller";
import { UpdateAnimalController } from "@modules/animal/useCases/animal/update/UpdateAnimalController";
import { DeleteAnimalController } from "@modules/animal/useCases/animal/delete/Animal.Controller";

export default (router: Router): void => {
  router.post("/animal", authenticated, CreateAnimalController.handle);
  router.put("/animal/:id", authenticated, UpdateAnimalController.handle);
  router.delete("/animal/:id", authenticated, DeleteAnimalController.handle);
};
