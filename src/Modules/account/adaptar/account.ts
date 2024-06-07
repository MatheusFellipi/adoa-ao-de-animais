import { AccountReturnNotPasswordModelView } from "../model/accountReturnNotPassword.modalView";

type Adaptar = {
  email: string, name: string, avatar: string, token: {
    token: string,
    expires_at: Date,
  }
}

export class AdaptarAccount {
  static accountReturn(account: Adaptar): AccountReturnNotPasswordModelView {
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
