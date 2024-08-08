
import { VaccinationCardModel } from "../model/vaccinationCard";

export class AdaptarVaccination {
  static vaccinationReturn(address: VaccinationCardModel[]): VaccinationCardModel[] {
    return address.map((item)=>(
      {
        id: item.id,
        dose: item.dose
      }
    ))
  }
}
