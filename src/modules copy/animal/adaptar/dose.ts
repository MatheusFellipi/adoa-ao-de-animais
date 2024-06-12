import { RelationshipVaccination } from "../infra/typeorm/entities/RelationshipVaccination.entity";
import { DoseModelView } from "../model/doseModelView";

export class AdaptarDose {
  static doseReturn(address: RelationshipVaccination[]): DoseModelView[] {
    return address.map((item) => (
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
