import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AccountRepository } from "@modules/account/infra/typeorm/repositories/Account.repository";
import { AppError } from "@shared/infra/errors/AppError";


interface IPayLoad {
  sub: string;
}

export async function ensureAuthenticated( request: Request, __: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError("o token esta faltando nos headers", 401);
  const [, token] = authHeader.split(" ");
  try {
    const { sub: id  } = verify(token, process.env.SECRET ?? "secret") as IPayLoad;
    const account_repository = new AccountRepository();
    const account = await account_repository.findById(parseInt(id));
    if (!account) throw new AppError("Esse usuário nao existe", 401);
    request.account = {
      ...account
    };
    next();
  } catch (error) {
    throw new AppError("o token esta invalido", 401);
  }
}
