import { CreateOrganizationController } from "@modules/organization/useCases/create/CreateOrganizationController";
import { Router } from "express";


export default (router: Router): void => {
  router.post("/organization", CreateOrganizationController.handle);
}