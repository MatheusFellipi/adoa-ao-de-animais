import { Router } from 'express'

export default (router: Router): void => {
  router.post('/register', () => {
    console.log('====================================');
    console.log("teste");
    console.log('====================================');
  })
}