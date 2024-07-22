import { IUserDtos } from "@modules/user/dtos/IUserDtos";

export interface IAccountDtos {
  id?: string;
  email: string;
  password: string;
  user: IUserDtos
  last_login?: Date;
}

