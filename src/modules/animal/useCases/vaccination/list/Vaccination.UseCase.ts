import { inject, injectable } from "tsyringe";

import { VaccinationModel } from "@modules/animal/model/vaccination";
import { IVaccinationRepository } from "@modules/animal/infra/repositories/IVaccinationRepository";

@injectable()
export class ListVaccinationUseCase {
  constructor(
    @inject("IVaccinationRepository") private _vaccination_repository: IVaccinationRepository
  ) { }
  async execute(): Promise<VaccinationModel[]> {
    return await this._vaccination_repository.all();
  }
}
