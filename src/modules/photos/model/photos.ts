import { AnimalModel } from "@modules/animal/model/animal";
import { OrganizationModel } from "@modules/organization/model/organization";

import { AppError } from "@shared/utils/errors/AppError";
import { validate } from "class-validator";

export class PhotoModelView {
  id?: number;
  organization?: OrganizationModel;
  animal?: AnimalModel;
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
  organization?: OrganizationModel;
  animal?: AnimalModel;
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
