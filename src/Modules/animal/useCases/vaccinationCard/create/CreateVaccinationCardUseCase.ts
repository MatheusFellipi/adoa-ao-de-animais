import { inject, injectable } from "tsyringe";

import { VaccinationCardModelView } from "@modules/animal/modelView/vaccinationCard";
import { CreateDoseController } from "../../dose/create/CreateDoseController";
import { IVaccinationCardRepository } from "@modules/animal/infra/repositories/IVaccinationCardRepository";

@injectable()
export class CreateVaccinationCardUseCase {
  constructor(
    @inject("IVaccinationCardRepository") private _vaccination_card_repository: IVaccinationCardRepository
  ) { }
  async execute(form: VaccinationCardModelView): Promise<VaccinationCardModelView> {
    const instancia = VaccinationCardModelView.validade(form);
    const doses = await CreateDoseController.handleInternal(instancia.dose)
    instancia.dose= doses
    return await this._vaccination_card_repository.create(instancia)
  }
}
