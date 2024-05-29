import app from "@shared/infra/http/config/app";
import request from 'supertest';

describe("Authenticate User", () => {
  it('should respond with a 200 status and "Hello World!"', async () => {
    const response = await request(app).get('/api-v1/register');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });

  it('should respond with a 201 create user full', async () => {
    const response = await request(app).post('/api-v1/user');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
