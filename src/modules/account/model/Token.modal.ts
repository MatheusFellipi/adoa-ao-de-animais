import { sign } from 'jsonwebtoken';
import { AccountModel } from './account.modal';

export class TokenModelView {
  id?: string;
  token: string;
  account?: AccountModel;
  expires_at: Date;

  static async create_token(account: { email: string, id: number }) {
    return sign({ email: account.email }, process.env.SECRET ?? "secret", {
      subject: account.id.toString(),
      expiresIn: "1d",
    });
  }
}


export class TokenReturnModel {
  email: string;
  name: string;
  avatar: string;
  token: string;
}
