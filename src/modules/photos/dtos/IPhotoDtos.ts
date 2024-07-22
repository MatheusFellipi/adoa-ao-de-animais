import { IAnimalDtos } from "@modules/animal/dtos/IAnimalDtos";

export interface IPhotoDtos {
  id?: string;
  animal?: IAnimalDtos
  url: string;
}

