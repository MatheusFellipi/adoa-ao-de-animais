declare namespace Express {
  export interface Request {
    type: "user" | "organization";
    account: {
      id?: string;
      name: string;
      avatar?: string;
    };
    file: {
      key: string;
    };
  }
}
