import { IAnimalDtos } from "@modules/animal/dtos/IAnimalDtos";

import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";

export interface IPhotoDtos {
  id?: number;
  animal?: IAnimalDtos
  organization?: IOrganizationDtos
  url: string;
}

