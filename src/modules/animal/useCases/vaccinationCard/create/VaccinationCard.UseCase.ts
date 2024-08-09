import { inject, injectable } from "tsyringe";

import { VaccinationCardModel } from "@modules/animal/model/vaccinationCard";
import { IVaccinationCardRepository } from "@modules/animal/infra/repositories/IVaccinationCardRepository";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { AppError } from "@shared/utils/errors/AppError";
import { IDoseRepository } from "@modules/animal/infra/repositories/IDoseRepository";
import { IVaccinationRepository } from "@modules/animal/infra/repositories/IVaccinationRepository";
import { Vaccination } from "@modules/animal/infra/typeorm/entities/Vaccination.entity";

@injectable()
export class CreateVaccinationCardUseCase {
  constructor(
    @inject("IVaccinationCardRepository")
    private _vaccination_card_repository: IVaccinationCardRepository,
    @inject("IAnimalRepository")
    private _respo_animal: IAnimalRepository,
    @inject("IDoseRepository")
    private _respo_dose: IDoseRepository,
    @inject("IVaccinationRepository")
    private _vaccination_repository: IVaccinationRepository
  ) {}

  async execute(form: VaccinationCardModel): Promise<void> {
    const instancia = await VaccinationCardModel.validade(form);

    const animal = await this._respo_animal.findById(instancia.animal_id);
    if (!animal || animal.vaccinationCard) throw new AppError("nao e possível adicionar o o cartão de vacinação do animal");

    const card = await this._vaccination_card_repository.create({ animal });

    const vaccinationMap = new Map<string, Vaccination>();

    if (instancia.dose) {
      for (const item of instancia.dose) {
        let vaccination = vaccinationMap.get(item.vaccination.name);

        if (!vaccination) {
          vaccination = await this._vaccination_repository.findExist(
            item.vaccination.name
          );
          if (!vaccination) {
            vaccination = await this._vaccination_repository.create(
              item.vaccination
            );
          }
          vaccinationMap.set(item.vaccination.name, vaccination);
        }

        await this._respo_dose.create({
          ...item,
          vaccination,
          vaccinationCard: card,
        });
      }
    }
  }
}
