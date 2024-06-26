import { inject, injectable } from "tsyringe";

import { VaccinationCardModelView } from "@modules/animal/model/vaccinationCard";
import { CreateDoseController } from "../../dose/create/CreateDoseController";
import { IVaccinationCardRepository } from "@modules/animal/infra/repositories/IVaccinationCardRepository";

@injectable()
export class CreateVaccinationCardUseCase {
  constructor(
    @inject("IVaccinationCardRepository") private _vaccination_card_repository: IVaccinationCardRepository
  ) { }
  async execute(form: VaccinationCardModelView): Promise<VaccinationCardModelView> {
    const instancia = VaccinationCardModelView.validade(form);
    const card = await this._vaccination_card_repository.create(instancia)
    instancia.dose = instancia.dose.map(item => ({
      ...item,
      vaccinationCard: card
    }))
    await CreateDoseController.handleInternal(instancia.dose)
    return card
  }
}
