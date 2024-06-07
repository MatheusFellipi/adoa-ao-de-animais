import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/infra/errors/AppError";
import { IContactRepository } from "@modules/contacts/infra/repositories/IContactRepository";

@injectable()
export class DeleteContactUseCase {
  constructor(
    @inject("IContactRepository") private _repository: IContactRepository
  ) {}
  async execute(id: number): Promise<void> {
    const contact = await this._repository.listByID(id);
    if (!contact)
      throw new AppError("Não foi possível deletar o contado");
    return await this._repository.delete(contact);
  }
}
