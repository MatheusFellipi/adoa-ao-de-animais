
import { VaccinationCardModelView } from "../modelView/vaccinationCard";

export class AdaptarVaccination {
  static vaccinationReturn(address: VaccinationCardModelView[]): VaccinationCardModelView[] {
    return address.map((item)=>(
      {
        id: item.id,
        dose: item.dose
      }
    ))
  }
}
