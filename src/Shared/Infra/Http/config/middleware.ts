import express, { Express } from 'express'
import helmet from 'helmet';
import cors from "cors"

import errorsMit from "@shared/infra/http/middleware/errors" 


export default (app: Express): void => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(errorsMit)
}