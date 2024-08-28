import { AnimalGender, AnimalSize } from "@modules/animal/enum/animal.enum";
import { AnimalAdType } from "../enums/animalAd.enum";
import { SortOrderEnum } from "@shared/utils/enums/query.enum";

export interface IAdQueryDtos {
  user?: { id: string };
  ad_id?: string;
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
