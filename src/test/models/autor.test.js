import { describe, it, jest } from "@jest/globals";
import Autor from '../../models/autor';

describe('Testando o modelo Autor' , () =>{
  const objectAutor = {
    nome:'J.K. Rowling',
    nacionalidade: 'Reino Unido'
  }

  it('Deve instanciar um novo autor', () => {
    const autor = new Autor(objectAutor);
    
    expect(autor).toEqual(
      expect.objectContaining(objectAutor),
    );
  });

  it('Deve fazer uma chamada simulada ao BD', () =>{
    const autor = new Autor(objectAutor);
        
    //Simulação - MOCK - Insert
    autor.salvar = jest.fn().mockReturnValue({
      id: 10,
      ...objectAutor,
      created_at: '2023-11-13',
      updated_at: '2023-11-13'
    });
    
    const retorno = autor.salvar();
    
    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objectAutor,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    );
  })
});
