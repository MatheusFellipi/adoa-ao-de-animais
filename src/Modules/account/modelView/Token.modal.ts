import { AccountModelView } from "./account.modalView";
import { sign } from 'jsonwebtoken';

export class TokenModelView {
  id?: number;
  token: string;
  account?: AccountModelView;
  expires_at: Date;

  static async create_token(account: { email: string, id: number }) {
    return sign({ email: account.email }, process.env.SECRET ?? "secret", {
      subject: account.id.toString(),
      expiresIn: "1d",
    });
  }

}

