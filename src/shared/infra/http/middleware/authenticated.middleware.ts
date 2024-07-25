import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AccountRepository } from "@modules/account/infra/typeorm/repositories/Account.repository";
import { AppError } from "@shared/utils/errors/AppError";
import { TokenRepository } from "@modules/account/infra/typeorm/repositories/Token.repository";

interface IPayLoad {
  sub: string;
}

export async function authenticated(
  request: Request,
  __: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError("o token esta faltando nos headers", 401);
  const [, token] = authHeader.split(" ");

  try {
    const { sub: id } = verify(
      token,
      process.env.SECRET ?? "secret"
    ) as IPayLoad;
    
    const _account_repository = new AccountRepository();
    const account = await _account_repository.findById(id);
    
    if (!account) throw new AppError("Esse usuário nao existe", 401);
    const _token_repository = new TokenRepository();
    
    const token_exits = await _token_repository.findByToken(token);
    if (!token_exits) throw new AppError("O token não esta disponível", 401);

    request.account = {
      account_id: account.id,
      token,
      ...account.user,
    };
    next();
  } catch (error) {
    throw new AppError("o token esta invalido", 401);
  }
}
