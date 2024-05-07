import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/infra/errors/AppError";


export default  (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  return response.status(500).json({
    status: "erro",
    message: `Interna server - ${error.message}`,
  });
}