import Editora from '../../models/editora';
import { describe, expect,it,jest } from '@jest/globals';

describe('Testando o modelo Editora', () => {
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'São Paulo',
    email: 'c@c.com'
  }

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);

    expect(editora).toEqual(
      expect.objectContaining(objetoEditora),
    );
  });

  it.skip('Deve salvar editora no BD', () =>{
    const editora = new Editora(objetoEditora);

    editora.salvar().then((dados) =>  {
      expect(dados.nome).toBe('CDC');
    })
  });

  it('Deve fazer uma chamada simulada ao BD', () =>{
    const editora = new Editora(objetoEditora);
    
    //Simulação - MOCK - Insert
    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      ...objetoEditora,
      created_at: '2023-11-13',
      updated_at: '2023-11-13'
    });

    const retorno = editora.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    );
  })
});
