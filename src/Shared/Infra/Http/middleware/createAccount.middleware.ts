import { AppError } from "@shared/infra/errors/AppError";
import { Request, Response, NextFunction } from "express";

export const createAccountMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, organization } = req.body;

  if (user && organization)
    throw new AppError(
      "Não é possível enviar dados de usuário e organização na mesma solicitação.",
      400
    );

  if (user) req.type = "user";
  else if (organization) req.type = "organization";
  else
    throw new AppError(
      "Formato de dados inválido. Deve incluir dados de usuário ou organização.",
      400
    );
  next();
};
