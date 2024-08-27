import { Router } from "express";
import { authenticated } from "../middleware/authenticated.middleware";

import { uploadConfig } from "@shared/config/upload";
import { CreatePhotosController } from "@modules/photos/useCases/create/Photos.Controller";
import { ListPhotosController } from "@modules/photos/useCases/list/Photos.Controller";
import { DeletePhotosController } from "@modules/photos/useCases/delete/Photos.Controller";

const avatar = uploadConfig.upload("./tmp/animal");

export default (router: Router): void => {
  router.get(
    "/photos/animal/:animal_id",
    authenticated,
    ListPhotosController.handle
  );
  router.patch(
    "/photos/animal/:animal_id",
    authenticated,
    avatar.array("photos"),
    CreatePhotosController.handle
  );
  router.delete(
    "/photos/animal/:animal_id",
    authenticated,
    avatar.array("photos"),
    DeletePhotosController.handle
  );
};
