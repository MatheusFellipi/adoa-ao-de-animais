import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";

import "@shared/infra/tsyringe/index";

import express from "express";
import setupMiddleware from "./middleware";
import setupRoutes from "./routes";
import errorsMit from "@shared/infra/http/middleware/errors.middleware";

const app = express();

app.get("/test", (req, res) => {
  res.status(200).json({});
});

setupMiddleware(app);
setupRoutes(app);
app.use(errorsMit);

export default app;
