import { Dose } from "../infra/typeorm/entities/Dose.entity";
import { DoseModelView } from "../model/doseModelView";

export class AdaptarDose {
  static doseReturn(dose: Dose[]): DoseModelView[] {
    return dose.map((item) => (
      {
        id: item.id,
        crmv: item.crmv,
        dose: item.dose,
        vaccination: item.vaccination,
        vaccinationCard: item.vaccinationCard,
        vaccination_date: item.vaccination_date
      }
    ))
  }
}
