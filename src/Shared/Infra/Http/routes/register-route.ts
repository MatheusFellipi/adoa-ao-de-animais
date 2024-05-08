import { Router } from 'express'

export default (router: Router): void => {
  router.get('/register', (request, response) => {
    return response.status(200).send('Registration endpoint')
  })
}