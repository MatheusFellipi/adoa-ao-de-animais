import app from "@shared/infra/http/config/app";
import request from 'supertest';

describe("Authenticate User", () => {
  it('should respond with a 200 status and "Hello World!"', async () => {
    const response = await request(app).get('/api-v1/register');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });

  it('should respond with a 201 create user full', async () => {
    const response = await request(app).post('/api-v1/user').send({
      email: "matheus@gmail.com", name: "matheus", avatar: "https://img", 
      addresses: [
        {
          street: "Rua",
          complement: "Arvore",
          district: "Centro",
          postal_code: "7567000",
          city: {
            id: 1,
            name: "Morrinhos"
          },
        }
      ], 
      animals: [{
        name: "nina",
        description: "oi",
        origin: "Residencia",
        size:2,
        gender:2,
        weight:"12",
        birthDate: Date.now,
        age:"12",
        microchipCode:"123123123",
        vaccinationCard:{
          vaccination:[
            {
              dose:"1",
              crmv:"123123123",
              vaccination_date: Date.now,
              vaccination:{
                name: "raiva",
                description: "para raiva",
              }
            }
          ]
        },
        photos:[{
        url: "htps://",

        }],
      }], 
      contacts: [{
        type: 1,
        name: "matheus",
        phone: "64992576711",
      }], 
      links: [
        {
          name: "instagram",
          link: "htps://"
        }
      ]
    });
    console.log('====================================');
    console.log(response.error);
    console.log('====================================');
    expect(response.status).toBe(200);
  });
});
