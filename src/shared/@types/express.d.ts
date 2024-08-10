declare namespace Express {
  export interface Request {
    account: {
      id?: string;
      token: string;
      account_id?: string;
      name: string;
      avatar?: string;
      type: number;
      cnpj_cpf: string;
      contacts: any[];
      addresses: any[];
    };
    files: [
      {
        key: string;
      }
    ];
    file: {
      key: string;
    };
  }
}
