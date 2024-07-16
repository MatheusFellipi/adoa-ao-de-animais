import app from '@shared/infra/http/config/app';
import request from 'supertest';

describe("Account user", () => {
  it('should respond with a 200 status and "Hello World!"', async () => {
    request(app)
    .get("/api-v1/account")
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
        expect(res.statusCode).toBe(200);
    })
  });
});
