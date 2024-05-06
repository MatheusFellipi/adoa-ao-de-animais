import "reflect-metadata";
require("dotenv").config({ path: __dirname + "/.env" });
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../Errors/AppError";

import helmet from "helmet";

var cors = require("cors");

const port = process.env.PORT || "3333";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }
    return response.status(500).json({
      status: "erro",
      message: `Interna server - ${error.message}`,
    });
  }
);

app.listen(port, () => {
  console.log("running server " + port);
});
