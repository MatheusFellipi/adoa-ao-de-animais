import { inject, injectable } from "tsyringe";

import { DoseModelView } from "@modules/animal/modelView/doseModelView";
import { IDoseRepository } from "@modules/animal/infra/repositories/IDoseRepository";
import { AdaptarDose } from "@modules/animal/adaptar/dose";

import { CreateVaccinationController } from "../../vaccination/create/CreateVaccinationController";

@injectable()
export class CreateDoseUseCase {
  constructor(
    @inject("IDoseRepository") private _relationship_vaccination: IDoseRepository
  ) { }
  
  async execute(form: DoseModelView[]): Promise<DoseModelView[]> {
    const dose: DoseModelView[] = []
    const dose_save: DoseModelView[] = []

    form.forEach((item) => {
      dose.push(DoseModelView.validade(item))
    })



    dose.forEach(async (item) => {
      const vaccination = await CreateVaccinationController.handleInternal(item.vaccination)
      item.vaccination = vaccination
      dose_save.push(await this._relationship_vaccination.create(item))
    })

    return AdaptarDose.doseReturn(dose_save)
  }
}
