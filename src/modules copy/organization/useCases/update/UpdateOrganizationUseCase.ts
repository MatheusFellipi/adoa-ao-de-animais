import { inject, injectable } from "tsyringe";
import configAws from "@config/aws"
import { AdaptarOrgs } from "@modules/organization/adaptar/organization";
import { OrganizationUpdateModelView } from "@modules/organization/model/organization";
import { IOrganizationRepository } from "@modules/organization/infra/repositories/IOrganizationsRepository";


@injectable()
export class UpdateOrganizationUseCase {
  constructor(
    @inject("IOrganizationRepository") private __repository: IOrganizationRepository
  ) { }

  async execute(form: OrganizationUpdateModelView, orgs_data: any): Promise<OrganizationUpdateModelView> {
    const instance = OrganizationUpdateModelView.validade(form);
    if (orgs_data.avatar && instance.avatar) {
      configAws.delete(orgs_data.avatar)
    }
    const org = await this.__repository.update(orgs_data, instance);
    return AdaptarOrgs.orgsUpdateReturn(org)
  }
}
