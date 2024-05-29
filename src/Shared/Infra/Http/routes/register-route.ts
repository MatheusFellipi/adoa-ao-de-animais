import { Router } from 'express'

export default (router: Router): void => {
  router.get('/register', (request, response) => {
    response.status(200).send('Hello World!');
  })
}