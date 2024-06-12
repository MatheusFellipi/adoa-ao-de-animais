import { inject, injectable } from "tsyringe";
import configAws from "@config/aws";
import { AdaptarOrgs } from "@modules/organization/adaptar/organization";
import { OrganizationModel } from "@modules/organization/model/organization";
import { IOrganizationRepository } from "@modules/organization/infra/repositories/IOrganizationsRepository";
import { AppError } from "@shared/utils/errors/AppError";

@injectable()
export class DeleteOrganizationUseCase {
  constructor(
    @inject("IOrganizationRepository")
    private __repository: IOrganizationRepository
  ) {}

  async execute(org: OrganizationModel, id_params: number): Promise<void> {
    if (org.id === id_params) {
      throw new AppError("Não e possível deleta a organização")
    }
    if (org.avatar) {
      configAws.delete(org.avatar);
    }
    await this.__repository.delete(org);
    return;
  }
}
