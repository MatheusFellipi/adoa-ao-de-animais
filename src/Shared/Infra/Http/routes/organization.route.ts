import { Router } from "express";

import { authenticated } from "../middleware/authenticated.middleware";

import { UpdateOrganizationController } from "@modules/organization/useCases/update/UpdateOrganizationController";

import uploadConfig from "@config/upload";
const avatar = uploadConfig.uploadS3("./tmp/avatar");

export default (router: Router): void => {
  router.put( "/organization/:id", authenticated, avatar.single("avatar"), UpdateOrganizationController.handle);
}