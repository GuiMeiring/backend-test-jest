import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import app from '../../app';
import request from 'supertest';

let server;

//HOOKS - ANtes de cada teste
beforeEach(() =>{
  const port= 3000;
  server = app.listen(port);
});

//HOOKS - Depois de cada teste
afterEach(() =>{
  server.close();
})

describe('GET em /autores', () => {

  it('Deve retornar uma lista de autores', async () => {
    const response = await request(app)
      .get('/autores')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(response.body[0].nome).toEqual('JRR Tolkien');
  });
});



