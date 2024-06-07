declare namespace Express {
  export interface Request {
    type: "user" | "organization";
    account: {
      user: {
        id: number;
      };
      organization: {
        id: number;
      };
    };
    file: {
      key: string;
    };
  }
}
