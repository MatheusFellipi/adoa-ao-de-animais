import "reflect-metadata";
import "@shared/container"

import "express-async-errors";

require("dotenv").config({ path: __dirname + "/.env" });

import express from 'express'
import setupMiddleware from './middleware'
import setupRoutes from './routes'
import errorsMit from "@shared/infra/http/middleware/errors" 

const app = express()
setupMiddleware(app)
setupRoutes(app)
app.use(errorsMit)

export default app