import { IAccountDtos } from "./account.dtos";

export interface ITokenDtos {
  id?: number;
  token: string;
  account: IAccountDtos;
  expires_at: Date;

}

