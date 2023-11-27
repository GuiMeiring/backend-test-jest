import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import app from '../../app';
import request from 'supertest';

let server;

let idResposta;

//HOOKS - ANtes de cada teste
beforeEach(() =>{
  const port= 3002;
  server = app.listen(port);
});

//HOOKS - Depois de cada teste
afterEach(() =>{
  server.close();
})

describe('GET em /livros', () => {

  it('Deve retornar uma lista de livros', async () => {
    const response = await request(app)
      .get('/livros')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(response.body[0].titulo).toEqual('O Hobbit');
  });
});

describe('POST em /livros', () => {

  it('Deve adicionar uma nova editora', async () => {

    const resposta = await request(app)
    .post('/livros')
    .send({
      titulo: 'Revolução dos bichos',
      paginas: 128,
      editora_id: 2,
      autor_id: 2,
    })
    .expect(201);

    idResposta = resposta.body.content.id;
  });

  it('Deve não adicionar nada ao passar o body vazio', async () => {
    await request(app)
    .post('/livros')
    .send({})
    .expect(500);
  });
});

describe('GET em /livros/id', () => {

  it('Deve retornar recurso selecionado', async () => {
    await request(app)
    .get(`/livros/${idResposta}`)
    .expect(200);
  })
});

describe('PUT em /livros/id', () => {

  test.each([
    ['titulo', {titulo: 'O Senhor do Anéis' }],
    ['paginas', { paginas: 'Estados Unidos'}],
    ['editora_id', {editora_id: 4}],
    ['autor_id', {autor_id: 3}]
  ])('Deve alterar o registro do BD', async (chave, param) => {

    const requisicao = { request }
    const spy = jest.spyOn(requisicao, 'request');

    await requisicao.request(app)
      .put(`/livros/${idResposta}`)
      .send(param)
      .expect(200);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /livros/id', () => {

  it('Deletar o recurso adicionado', async () => {
    await request(app)
    .delete(`/livros/${idResposta}`)
    .expect(200);
  });
});
