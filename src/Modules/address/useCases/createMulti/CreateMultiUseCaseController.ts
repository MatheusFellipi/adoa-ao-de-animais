import { container } from "tsyringe";

import { Address } from "@modules/address/infra/typeorm/entities/address.entity";

import { AddressModelView } from "@modules/address/modelView/address";
import { CreateMultiUseCase } from "./CreateMultiUseCase";

export class AddressCreateMultiUseCaseController {
  static async handle(form: AddressModelView[], relation: Object, key: "user"): Promise<Address[]> {
    const create = container.resolve(CreateMultiUseCase);
    return await create.execute(form, relation, key);
  }
}
