import { TestBed } from '@angular/core/testing';
import { BuscarProdutosService } from './buscar-produtos.service';
import { ProdutoDTO } from '../../../models/Produto';

describe('BuscarProdutosService', () => {
  let service: BuscarProdutosService;
  const produtosMock: ProdutoDTO[] = [
    { id: 1, nome: 'Produto A', taxa_anual: 5, prazo_maximo: 12 },
    { id: 2, nome: 'Produto B', taxa_anual: 10, prazo_maximo: 24 },
    { id: 3, nome: 'Produto C Especial', taxa_anual: 7, prazo_maximo: 18 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarProdutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar todos os produtos se o termo estiver vazio ou só espaços', () => {
    expect(service.buscarFuzzy(produtosMock, '')).toEqual(produtosMock);
    expect(service.buscarFuzzy(produtosMock, '   ')).toEqual(produtosMock);
  });

  it('deve buscar por nome corretamente', () => {
    const resultado = service.buscarFuzzy(produtosMock, 'Produto A');
    expect(resultado.length).toBe(2);
    expect(resultado.some(p => p.nome === 'Produto A')).toBeTrue();
  });

  it('deve buscar ignorando maiúsculas e minúsculas', () => {
    const resultado = service.buscarFuzzy(produtosMock, 'produto b');
    expect(resultado.length).toBe(1);
    expect(resultado[0].nome).toBe('Produto B');
  });

  it('deve buscar usando números de taxa ou prazo', () => {
    let resultado = service.buscarFuzzy(produtosMock, '10');
    expect(resultado.length).toBe(1);
    expect(resultado[0].nome).toBe('Produto B');

    resultado = service.buscarFuzzy(produtosMock, '18');
    expect(resultado.length).toBe(1);
    expect(resultado[0].nome).toBe('Produto C Especial');
  });

  it('deve retornar produtos que contenham todas as palavras do termo separado por espaço', () => {
    const resultado = service.buscarFuzzy(produtosMock, 'Produto Especial');
    expect(resultado.length).toBe(1);
    expect(resultado[0].nome).toBe('Produto C Especial');
  });

  it('deve retornar array vazio se não encontrar correspondência', () => {
    const resultado = service.buscarFuzzy(produtosMock, 'Produto Inexistente');
    expect(resultado.length).toBe(0);
  });
});
