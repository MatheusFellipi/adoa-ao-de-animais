import { inject, injectable } from "tsyringe";

import { OrganizationModel } from "@modules/organization/model/organization";
import { IOrganizationRepository } from "@modules/organization/infra/repositories/IOrganizationsRepository";



@injectable()
export class CreatePhotosOrganizationUseCase {
  constructor(
    @inject("IOrganizationRepository") private __repository: IOrganizationRepository
  ) { }
  async execute(data: OrganizationModel): Promise<void> {
    const instance = OrganizationModel.validade(data);
  }
}
