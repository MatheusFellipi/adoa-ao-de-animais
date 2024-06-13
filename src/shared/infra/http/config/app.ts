import express from 'express'
import setupMiddleware from './middleware'
import setupRoutes from './routes'
import errorsMit from "@shared/infra/http/middleware/errors.middleware" 

const app = express()
setupMiddleware(app)
setupRoutes(app)
app.use(errorsMit)

export default app