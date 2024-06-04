import "reflect-metadata";
require("dotenv").config();
import "@shared/container"

import "express-async-errors";


import express from 'express'
import setupMiddleware from './middleware'
import setupRoutes from './routes'
import errorsMit from "@shared/infra/http/middleware/errors" 

const app = express()
setupMiddleware(app)
setupRoutes(app)
app.use(errorsMit)

export default app