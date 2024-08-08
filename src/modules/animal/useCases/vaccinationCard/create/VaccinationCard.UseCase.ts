import { inject, injectable } from "tsyringe";

import { VaccinationCardModel } from "@modules/animal/model/vaccinationCard";
import { CreateDoseController } from "../../dose/create/CreateDoseController";
import { IVaccinationCardRepository } from "@modules/animal/infra/repositories/IVaccinationCardRepository";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { AppError } from "@shared/utils/errors/AppError";

@injectable()
export class CreateVaccinationCardUseCase {
  constructor(
    @inject("IVaccinationCardRepository")
    private _vaccination_card_repository: IVaccinationCardRepository,
    @inject("IAnimalRepository") private _respo_animal: IAnimalRepository
  ) {}
  async execute(
    form: VaccinationCardModel,
    animal_id: string
  ): Promise<VaccinationCardModel> {
    const instancia = await VaccinationCardModel.validade(form);
    const animal = await this._respo_animal.findById(animal_id);
    if (!animal)
      throw new AppError(
        "nao e possível adicionar o o cartão de vacinação do animal"
      );
    const card = await this._vaccination_card_repository.create(instancia);
    instancia.dose = instancia.dose.map((item) => ({
      ...item,
      vaccinationCard: card,
    }));
    await CreateDoseController.handleInternal(instancia.dose);
    return card;
  }
}
