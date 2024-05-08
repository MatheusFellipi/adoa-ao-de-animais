import { Express, Router } from "express"
import { readdirSync } from "fs"

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger.json";

export default (app: Express): void => {
  const router = Router()
  app.use("/api-v1-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.use('/api-v1', router)
  readdirSync(`${__dirname}/../routes`).map(async file => {
    (await import(`${__dirname}/../routes/${file}`)).default(router)
  })
}