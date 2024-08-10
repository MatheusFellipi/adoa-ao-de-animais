import { Router } from "express";
import { authenticated } from "../middleware/authenticated.middleware";

import { CreateAnimalController } from "@modules/animal/useCases/animal/create/Animal.Controller";
import { UpdateAnimalController } from "@modules/animal/useCases/animal/update/Animal.Controller";
import { DeleteAnimalController } from "@modules/animal/useCases/animal/delete/Animal.Controller";
import { ListAnimalController } from "@modules/animal/useCases/animal/list/Animal.Controller";

import { CreateVaccinationCardController } from "@modules/animal/useCases/vaccinationCard/create/VaccinationCard.Controller";
import { CreateDoseController } from "@modules/animal/useCases/dose/create/Dose.Controller";
import { ListVaccinationController } from "@modules/animal/useCases/vaccination/list/Vaccination.Controller";

import { uploadConfig } from "@shared/config/upload";
import { CreatePhotosController } from "@modules/photos/useCases/create/Photos.Controller";

const avatar = uploadConfig.upload("./tmp/animal");

export default (router: Router): void => {
  router.get("/animal", authenticated, ListAnimalController.handle);
  router.get("/animal/vaccination", authenticated, ListVaccinationController.handle)
  
  router.get("/animal/photos", authenticated, ListVaccinationController.handle)
  router.patch("/animal/photos/:animal_id", authenticated, avatar.array("photos"), CreatePhotosController.handle)

  router.post("/animal", authenticated, CreateAnimalController.handle);
  router.post("/animal/vaccination-card", authenticated, CreateVaccinationCardController.handle )
  router.post("/animal/dose", authenticated, CreateDoseController.handle )
  router.put("/animal/:id", authenticated, UpdateAnimalController.handle);
  router.delete("/animal/:id", authenticated, DeleteAnimalController.handle);
};
