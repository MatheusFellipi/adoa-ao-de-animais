import { IAnimalDtos } from "@modules/animal/dtos/IAnimalDtos";
import { AnimalAdType } from "../enums/animalAd.enum";


export interface IAdDtos {
  id?: number;
  title: string;
  description: string;
  type: AnimalAdType;
  animal: IAnimalDtos;
}

