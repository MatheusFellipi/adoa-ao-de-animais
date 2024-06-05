import { AnimalGender, AnimalSize } from "../enum/animal.enum";
import { IVaccinationCardDtos } from "./IVaccinationCardDtos";


export interface IAnimalDtos {
  id?: number;
  name: string;
  description?: string;
  origin?: string;
  size: AnimalSize;
  gender: AnimalGender;
  weight?: string;
  birthDate?: Date;
  age?: string;
  microchipCode?: string;
  vaccinationCard?: IVaccinationCardDtos;
  photos?: string[];
}

