import { Dose } from "../infra/typeorm/entities/Dose.entity";
import { DoseModel } from "../model/doseModelView";

export class AdaptarDose {
  static doseReturn(dose: Dose[]): DoseModel[] {
    return dose.map((item) => (
      {
        id: item.id,
        crmv: item.crmv,
        description: item.description,
        vaccination: item.vaccination,
        vaccinationCard: item.vaccinationCard,
        vaccination_date: item.vaccination_date
      }
    ))
  }
}
