import { ICityDtos } from "./ICityDtos";

export interface IStateDtos {
  acronyms: string;
  name: string;
  cities?: ICityDtos[];
}

