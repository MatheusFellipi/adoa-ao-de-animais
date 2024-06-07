import { AnimalModelView } from "@modules/animal/modelView/animal";
import { OrganizationModelView } from "@modules/organization/modelView/organization";

import { AppError } from "@shared/infra/errors/AppError";
import { validate } from "class-validator";

export class PhotoModelView {
  id?: number;
  organization?: OrganizationModelView;
  animal?: AnimalModelView;
  url: string;

  static validade(data: PhotoModelView) {
    const instance = new PhotoModelView();
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 400);
    });
    return data
  }
}

export class PhotoCreateInternalModelView {
  id?: number;
  organization?: OrganizationModelView;
  animal?: AnimalModelView;
  photos: { url: string }[];

  static validade(data: PhotoCreateInternalModelView) {
    const instance = new PhotoCreateInternalModelView();
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 400);
    });
    return data
  }
}
