import { AccountReturnNotPasswordModel } from "../model/accountReturnNotPassword.modal"

type Adaptar = {
  email: string, name: string, avatar: string, token: {
    token: string,
    expires_at: Date,
  }
}

export class AdaptarAccount {
  static accountReturn(account: Adaptar): AccountReturnNotPasswordModel {
    return {
      token: {
        token: account.token.token,
        expires_at: account.token.expires_at,
      },
      email: account.email,
      name: account.name
    }
  }
}
