import { container } from "tsyringe";

import { AddressModelView } from "@modules/address/modelView/address";
import { CreateMultiUseCase } from "./CreateMultiUseCase";

export class AddressCreateMultiUseCaseController {
  static async handle(form: AddressModelView[], relation: Object, key: "user" | "organization"): Promise<AddressModelView[]> {
    const create = container.resolve(CreateMultiUseCase);
    return await create.execute(form, relation, key);
  }
}
