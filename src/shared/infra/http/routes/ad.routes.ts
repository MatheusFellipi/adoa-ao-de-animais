import { Router } from "express";

import { authenticated } from "../middleware/authenticated.middleware";

import { AdCreateController } from "@modules/ad/useCases/create/Ad.Controller";
import { AdListController } from "@modules/ad/useCases/list/Ad.Controller";
import { AdDeleteController } from "@modules/ad/useCases/delete/Ad.Controller";
import { ADUpdatesCreateController } from "@modules/ad/useCases/update/Ad.Controller";

export default (router: Router): void => {
  router.get("/ad/animal/", authenticated, AdListController.handle);
  router.post("/ad/animal", authenticated, AdCreateController.handle);
  router.put("/ad/animal/:id", authenticated, ADUpdatesCreateController.handle);
  router.delete("/ad/animal/:id", authenticated, AdDeleteController.handle);
};
