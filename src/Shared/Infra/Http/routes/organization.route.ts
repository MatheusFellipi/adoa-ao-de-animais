import { Router } from "express";

import { authenticated } from "../middleware/authenticated.middleware";

import { UpdateOrganizationController } from "@modules/organization/useCases/update/UpdateOrganizationController";
import { CreatePhotosOrganizationController } from "@modules/organization/useCases/createPhotos/CreatePhotosOrganizationController";

import uploadConfig from "@config/upload";
const avatar = uploadConfig.uploadS3("./tmp/avatar");

export default (router: Router): void => {
  router.put( "/organization/:id", authenticated, avatar.single("avatar"), UpdateOrganizationController.handle);
  router.post("/organization/photo/:id", authenticated, avatar.array("photos"), CreatePhotosOrganizationController.handle);
  router.delete("/organization/photo/:id", authenticated, avatar.array("photos"), CreatePhotosOrganizationController.handle);
}