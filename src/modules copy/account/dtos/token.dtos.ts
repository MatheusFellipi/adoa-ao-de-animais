import { IAccountDtos } from "./account.dtos";

export interface ITokenDtos {
  id?: number;
  token: string;
  account?: IAccountDtos;
  created_at?: Date;
  expires_at: Date;
}
