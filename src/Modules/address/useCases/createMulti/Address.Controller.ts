import { container } from "tsyringe";

import { AddressModelView } from "@modules/address/model/address";
import { CreateMultiUseCase } from "./Address.UseCase";

export class AddressCreateMultiUseCaseController {
  static async handle(form: AddressModelView[], relation: Object, key: "user" | "organization"): Promise<AddressModelView[]> {
    const create = container.resolve(CreateMultiUseCase);
    return await create.execute(form, relation, key);
  }
}
