import { Router } from "express";
import { authenticated } from "../middleware/authenticated.middleware";

import { CreateAnimalController } from "@modules/animal/useCases/animal/create/Animal.Controller";
import { UpdateAnimalController } from "@modules/animal/useCases/animal/update/Animal.Controller";
import { DeleteAnimalController } from "@modules/animal/useCases/animal/delete/Animal.Controller";
import { ListAnimalController } from "@modules/animal/useCases/animal/list/Animal.Controller";

import { CreateVaccinationCardController } from "@modules/animal/useCases/vaccinationCard/create/VaccinationCard.Controller";

export default (router: Router): void => {
  router.get("/animal", authenticated, ListAnimalController.handle);
  router.post("/animal", authenticated, CreateAnimalController.handle);
  router.post("/animal/vaccination-card", authenticated, CreateVaccinationCardController.handle )
  router.put("/animal/:id", authenticated, UpdateAnimalController.handle);
  router.delete("/animal/:id", authenticated, DeleteAnimalController.handle);
};
