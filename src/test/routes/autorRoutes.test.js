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

describe('POST em /autores', () => {

  it('Deve adicionar uma nova editora', async () => {

    const resposta = await request(app)
    .post('/autores')
    .send({
      nome:'George Orwell',
      nacionalidade: 'Reino Unido'
    })
    .expect(201);

    idResposta = resposta.body.content.id;
  });

  it('Deve não adicionar nada ao passar o body vazio', async () => {
    await request(app)
    .post('/autores')
    .send({})
    .expect(500);
  });
});

describe('GET em /autores/id', () => {

  it('Deve retornar recurso selecionado', async () => {
    await request(app)
    .get(`/autores/${idResposta}`)
    .expect(200);
  })
});

describe('PUT em /autores/id', () => {

  test.each([
    ['nome', {nome: 'Mark Twain' }],
    ['nacionalidade', { nacionalidade: 'Estados Unidos'}]
  ])('Deve alterar o registro do BD', async (chave, param) => {

    const requisicao = { request }
    const spy = jest.spyOn(requisicao, 'request');

    await requisicao.request(app)
      .put(`/autores/${idResposta}`)
      .send(param)
      .expect(200);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /autores/id', () => {

  it('Deletar o recurso adicionado', async () => {
    await request(app)
    .delete(`/autores/${idResposta}`)
    .expect(200);
  });
});
