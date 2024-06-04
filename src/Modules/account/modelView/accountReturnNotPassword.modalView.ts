export class AccountReturnNotPasswordModelView {
  email: string;
  name: string
  token: {
    token: string
    expires_at: Date;
  }
}

