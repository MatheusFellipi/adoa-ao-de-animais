import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/utils/errors/AppError";
import { IContactRepository } from "@modules/contacts/infra/repositories/IContactRepository";
import { RequestType } from "@shared/type/request.type";

@injectable()
export class DeleteContactUseCase {
  constructor(
    @inject("IContactRepository") private _repository: IContactRepository
  ) {}
  async execute( id: string, account_id: string ): Promise<void> {
    const contact = await this._repository.listByID(id);
    if (!contact || contact.user.id !== account_id)
      throw new AppError("Não foi possível deletar o contado");
    return await this._repository.delete(contact);
  }
}
