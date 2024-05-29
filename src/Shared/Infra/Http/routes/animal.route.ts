import { CreateAnimalController } from "@modules/animal/useCases/createAnimal/CreateAnimalsController";
import { Router } from "express";


export default (router: Router): void => {
  router.post("/animal", CreateAnimalController.handle);
}