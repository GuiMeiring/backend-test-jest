import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import app from '../../app';
import request from 'supertest';

let server;

let idResposta;

//HOOKS - ANtes de cada teste
beforeEach(() =>{
  const port= 3000;
  server = app.listen(port);
});

//HOOKS - Depois de cada teste
afterEach(() =>{
  server.close();
})

describe('GET em /editoras', () => {

  it('Deve retornar uma lista de editoras', async () => {
    const response = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(response.body[0].email).toEqual('e@e.com');
  });
});

describe('POST em /editoras', () => {

  it('Deve adicionar uma nova editora', async () => {

    const resposta = await request(app)
    .post('/editoras')
    .send({
      nome:'CDC',
      cidade: 'São Paulo',
      email:'s@s.com'
    })
    .expect(201);

    idResposta = resposta.body.content.id;
  });

  it('Deve não adicionar nada ao passar o body vazio', async () => {
    await request(app)
    .post('/editoras')
    .send({})
    .expect(500);
  });
});

describe('GET em /editoras/id', () => {

  it('Deve retornar recurso selecionado', async () => {
    await request(app)
    .get(`/editoras/${idResposta}`)
    .expect(200);
  })
});

describe('PUT em /editoras/id', () => {
  test.each([
    ['nome', { nome: 'Casa do Codigo' }],
    ['cidade', { cidade: 'SP' }],
    ['email', { email: 'cdc@cdc.com' }],
  ])('Deve alterar o registro do BD', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');

    await requisicao.request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(200);
    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /editoras/id', () => {

  it('Deletar o recurso adicionado', async () => {
    await request(app)
    .delete(`/editoras/${idResposta}`)
    .expect(200);
  });
});

describe('DELETE em /editoras/id', () => {

  it('Deletar o recurso adicionado', async () => {
    await request(app)
    .delete(`/editoras/${idResposta}`)
    .expect(200);
  });
});
