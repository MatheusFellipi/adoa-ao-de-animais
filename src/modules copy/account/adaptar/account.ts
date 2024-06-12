import { TokenReturnModel } from "../model/Token.modal";

type Adaptar = {
  email: string;
  name: string;
  avatar: string;
  token: string;
};

export class AdaptarAccount {
  static accountReturn(account: Adaptar): TokenReturnModel {
    return {
      token: account.token,
      avatar: account.avatar,
      email: account.email,
      name: account.name,
    };
  }
}
