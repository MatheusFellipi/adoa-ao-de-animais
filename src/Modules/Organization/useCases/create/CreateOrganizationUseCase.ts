import { inject, injectable } from "tsyringe";
import { AddressCreateMultiUseCaseController } from "@modules/address/useCases/createMulti/CreateMultiUseCaseController";
import { AdaptarOrgs } from "@modules/organization/adaptar/organization";
import { OrganizationModelView } from "@modules/organization/modelView/organization";
import { IOrganizationRepository } from "@modules/organization/infra/repositories/IOrganizationsRepository";
import { AppError } from "@shared/infra/errors/AppError";
import { LinkCreateUseCaseController } from "@modules/contacts/controllers/link/create/LinksUseCaseController";
import { ContactCreateUseCaseController } from "@modules/contacts/controllers/contact/create/ContactsCreateUseCaseController";


@injectable()
export class CreateOrganizationUseCase {
  constructor(
    @inject("IOrganizationRepository") private __repository: IOrganizationRepository
  ) { }

  async execute(data: OrganizationModelView): Promise<OrganizationModelView> {
    const instance = OrganizationModelView.validade(data);
    const exists = await this.__repository.findExistsBy(data.cnpj_cpf);
    
    if (exists) throw new AppError("O cnpj/cpf ja esta em cadastrado.", 400);
    const org = await this.__repository.create(instance);

    const address = await AddressCreateMultiUseCaseController.handle(instance.addresses, org, "organization")

    let link = []
    if (instance.links) 
      link = await LinkCreateUseCaseController.handleInternal(instance.links, org, "organization")
    
    let contacts = []
    if (instance.contacts) 
      contacts = await ContactCreateUseCaseController.handleInternal(instance.contacts, org, "organization")

    return AdaptarOrgs.orgsReturn(address, org, link ,contacts)
  }
}
