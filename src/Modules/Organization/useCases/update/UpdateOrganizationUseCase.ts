import { inject, injectable } from "tsyringe";
import { AddressCreateMultiUseCaseController } from "@modules/address/useCases/createMulti/CreateMultiUseCaseController";
import { AdaptarOrgs } from "@modules/organization/adaptar/organization";
import { OrganizationModelView, OrganizationUpdateModelView } from "@modules/organization/modelView/organization";
import { IOrganizationRepository } from "@modules/organization/infra/repositories/IOrganizationsRepository";
import { AppError } from "@shared/infra/errors/AppError";
import { LinkCreateUseCaseController } from "@modules/contacts/controllers/link/create/LinksUseCaseController";
import { ContactCreateUseCaseController } from "@modules/contacts/controllers/contact/create/ContactsCreateUseCaseController";


@injectable()
export class UpdateOrganizationUseCase {
  constructor(
    @inject("IOrganizationRepository") private __repository: IOrganizationRepository
  ) { }

  async execute(form: OrganizationUpdateModelView, orgs_data: any): Promise<OrganizationUpdateModelView> {
    const instance = OrganizationUpdateModelView.validade(form);
    orgs_data.name = instance.name
    orgs_data.avatar = instance.avatar
    orgs_data.description = instance.description
    orgs_data.type = instance.type
    orgs_data.cnpj_cpf = instance.cnpj_cpf
    orgs_data.operation_at = instance.operation_at

    const org = await this.__repository.update(orgs_data);
    return AdaptarOrgs.orgsUpdateReturn(org)
  }
}
