import { inject, injectable } from "tsyringe";

import { VaccinationModelView } from "@modules/animal/modelView/vaccination";
import { IVaccinationRepository } from "@modules/animal/infra/repositories/IVaccinationRepository";

@injectable()
export class CreateVaccinationUseCase {
  constructor(
    @inject("IVaccinationRepository") private _vaccination_repository: IVaccinationRepository
  ) { }
  async execute(form: VaccinationModelView): Promise<VaccinationModelView> {
    const instancia = VaccinationModelView.validade(form);
    return await this._vaccination_repository.create(instancia);
  }
}