import { AccountModelView } from "./account.modalView";
import { sign } from 'jsonwebtoken';

export class TokenModelView {
  id?: number;
  token: string;
  account: AccountModelView;
  expiresAt: Date;

  static async create_token(account: AccountModelView) {
    return sign({ email: account.email }, process.env.SECRET ?? "secret", {
      subject: account.id.toString(),
      expiresIn: "1d",
    });
  }

}

