import express, { Express } from 'express'
import helmet from 'helmet';
import cors from "cors"
import { pagination } from 'typeorm-pagination';

export default (app: Express): void => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json())
  app.use(pagination)
}