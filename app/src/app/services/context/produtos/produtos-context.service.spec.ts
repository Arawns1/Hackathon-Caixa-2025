import { TestBed } from '@angular/core/testing';
import { ProdutosContextService } from './produtos-context.service';
import { ProdutoDTO } from '../../../models/Produto';

describe('ProdutosContextService', () => {
  let service: ProdutosContextService;
  const produtoMock: ProdutoDTO = { id: 1, nome: 'Produto 01', prazo_maximo: 24, taxa_anual: 0.12 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProdutosContextService],
    });
    service = TestBed.inject(ProdutosContextService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('deve inicializar o produto selecionado como null', () => {
    expect(service.produtoSelecionado()).toBeNull();
  });

  describe('setProdutoSelecionado', () => {
    it('deve atualizar o produto selecionado corretamente', () => {
      service.setProdutoSelecionado(produtoMock);
      expect(service.produtoSelecionado()).toEqual(produtoMock);
    });
  });

  describe('limparProdutoSelecionado', () => {
    it('deve limpar o produto selecionado', () => {
      service.setProdutoSelecionado(produtoMock);
      service.limparProdutoSelecionado();
      expect(service.produtoSelecionado()).toBeNull();
    });
  });
});
