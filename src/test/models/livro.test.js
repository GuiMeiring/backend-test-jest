import { describe, it, jest } from "@jest/globals";
import Livro from '../../models/livro';

describe('Testando o modelo Livro' , () =>{
  const objetoLivro = {
    titulo: 'Harry Potter e a Pedra Filosofa',
    paginas: 223,
    editora_id: 10,
    autor_id: 10,
  }

  it('Deve instanciar um novo livro', () => {
    const livro = new Livro(objetoLivro);
    
    expect(livro).toEqual(
      expect.objectContaining(objetoLivro),
    );
  });

  it('Deve fazer uma chamada simulada ao BD', () =>{
    const livro = new Livro(objetoLivro);
        
    //Simulação - MOCK - Insert
    livro.salvar = jest.fn().mockReturnValue({
      id: 10,
      ...objetoLivro,
      created_at: '2023-11-13',
      updated_at: '2023-11-13'
    });
    
    const retorno = livro.salvar();
    
    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoLivro,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    );
  })
});

