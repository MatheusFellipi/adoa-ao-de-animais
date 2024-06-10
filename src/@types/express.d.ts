declare namespace Express {
  export interface Request {
    type: "user" | "organization";
    account: {
      user: User;
      organization: Organization;
    };
    file: {
      key: string;
    };
  }
}
