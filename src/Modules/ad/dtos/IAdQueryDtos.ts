import { AnimalGender, AnimalSize } from "@modules/animal/enum/animal.enum";
import { AnimalAdType } from "../enums/animalAd.enum";
import { SortOrderEnum } from "@shared/utils/enums/query.enum";

export interface IAdQueryDtos {
  account_id?: { id: number };
  organization?: { id: number };
  user?: { id: number };
  ad_id?: number;
  title?: string;
  description?: string;
  type?: AnimalAdType;
  size?: AnimalSize;
  gender?: AnimalGender;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: SortOrderEnum;
}
