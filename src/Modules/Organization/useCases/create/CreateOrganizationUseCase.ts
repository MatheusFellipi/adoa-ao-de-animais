import { inject, injectable } from "tsyringe";
import { validate } from "class-validator";

import { AppError } from "@shared/infra/errors/AppError";
import { OrganizationModelView } from "@modules/organization/modelView/organization";
import { Organization } from "@modules/organization/infra/typeorm/entities/organization.entity";
import { IOrganizationRepository } from "@modules/organization/infra/repositories/IOrganizationsRepository";

@injectable()
export class CreateOrganizationUseCase {
  constructor(
    @inject("IOrganizationRepository") private userRepository: IOrganizationRepository
  ) { }

  async execute(data: OrganizationModelView): Promise<Organization> {
    const org = OrganizationModelView.validade(data);
    const org_user = await this.userRepository.findByCpfCnpj(data.cnpj_cpf);
    if (org_user) throw new AppError("O cnpj/cpf ja esta em cadastrado.", 400);
    return await this.userRepository.create(org);
  }
}
