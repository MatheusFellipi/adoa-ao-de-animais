declare namespace Express {
  export interface Request {
    type: "user" | "organization"
    account: {
      user: object
      organization: object
    },
    file:{
      key:string
    }
  }
}
