import { inject, injectable } from "tsyringe";
import { OrganizationModel } from "@modules/organization/model/organization";
import { IOrganizationRepository } from "@modules/organization/infra/repositories/IOrganizationsRepository";
import { AppError } from "@shared/utils/errors/AppError";


@injectable()
export class CreateOrganizationUseCase {
  constructor(
    @inject("IOrganizationRepository") private __repository: IOrganizationRepository
  ) { }

  async execute(data: OrganizationModel): Promise<OrganizationModel> {
    const instance = OrganizationModel.validade(data);
    const exists = await this.__repository.findExistsBy(data.cnpj_cpf);
    if (exists) throw new AppError("O cnpj/cpf ja esta em cadastrado.", 400);
    const org = await this.__repository.create(instance);
    return org
  }
}
