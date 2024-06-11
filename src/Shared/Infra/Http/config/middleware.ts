import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import { pagination } from "typeorm-pagination";
var cookieParser = require("cookie-parser");

export default (app: Express): void => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(pagination);
  app.use(cookieParser());
};
