import { IAccountDtos } from "./account.dtos";

export interface ITokenDtos {
  id?: string;
  token: string;
  account?: IAccountDtos;
  created_at?: Date;
  expires_at: Date;
}
