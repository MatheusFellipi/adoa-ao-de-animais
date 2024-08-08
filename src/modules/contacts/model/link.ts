import { UserModal } from "@modules/user/model/user";
import { IsNotEmpty, validate } from "class-validator";
import { AppError } from "@shared/utils/errors/AppError";

export class LinkModel {
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  url: string;

  user?: UserModal;

  static async validade(data: LinkModel) {
    const instance = new LinkModel();
    Object.assign(instance, data);
    const errors = await validate(instance);
    if (errors.length > 0)
      throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString());
    return instance;
  }
}
