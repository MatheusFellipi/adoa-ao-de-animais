import { inject, injectable } from "tsyringe";

import { DoseModel } from "@modules/animal/model/doseModelView";
import { IDoseRepository } from "@modules/animal/infra/repositories/IDoseRepository";
import { IVaccinationRepository } from "@modules/animal/infra/repositories/IVaccinationRepository";
import { IVaccinationCardRepository } from "@modules/animal/infra/repositories/IVaccinationCardRepository";
import { AppError } from "@shared/utils/errors/AppError";

@injectable()
export class CreateDoseUseCase {
  constructor(
    @inject("IDoseRepository")
    private _respo_dose: IDoseRepository,
    @inject("IVaccinationRepository")
    private _vaccination_repository: IVaccinationRepository,
    @inject("IVaccinationCardRepository")
    private _vaccination_card_repository: IVaccinationCardRepository
  ) {}

  async execute(form: DoseModel): Promise<DoseModel> {
    const instancia = await DoseModel.validade(form);
    
    const card = await this._vaccination_card_repository.findById(instancia.vaccination_card_id);
    if (!card) throw new AppError("nao e possível adicionar a vacina no cartão");

    let vaccination = await this._vaccination_repository.findExist(
      instancia.vaccination.name
    );
    if (!vaccination)
      vaccination = await this._vaccination_repository.create(
        instancia.vaccination
      );
    return await this._respo_dose.create({
      ...instancia,
      vaccination: vaccination,
      vaccinationCard: card,
    });
  }
}
