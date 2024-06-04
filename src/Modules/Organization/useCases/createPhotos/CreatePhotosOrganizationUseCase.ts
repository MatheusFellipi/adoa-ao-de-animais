import { inject, injectable } from "tsyringe";

import { OrganizationModelView } from "@modules/organization/modelView/organization";
import { IOrganizationRepository } from "@modules/organization/infra/repositories/IOrganizationsRepository";



@injectable()
export class CreatePhotosOrganizationUseCase {
  constructor(
    @inject("IOrganizationRepository") private __repository: IOrganizationRepository
  ) { }
  async execute(data: OrganizationModelView): Promise<OrganizationModelView> {
    const instance = OrganizationModelView.validade(data);

  }
}
