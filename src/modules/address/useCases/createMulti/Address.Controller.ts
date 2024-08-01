import { container } from "tsyringe";

import { AddressModel } from "@modules/address/model/address";
import { CreateMultiUseCase } from "./Address.UseCase";

export class AddressCreateMultiUseCaseController {
  static async handle(form: AddressModel[], relation: Object, key: "user" | "organization"): Promise<AddressModel[]> {
    const create = container.resolve(CreateMultiUseCase);
    return await create.execute(form, relation, key);
  }
}
