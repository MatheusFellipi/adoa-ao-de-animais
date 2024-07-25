declare namespace Express {
  export interface Request {
    account: {
      id?: string;
      account_id?: string
      name: string;
      avatar?: string;
      type: number;
      cnpj_cpf: string;
      contacts: any[];
      addresses: any[];
    };
    file: {
      key: string;
    };
  }
}
