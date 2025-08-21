import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment.development';
import { ProdutoDTO, SalvarProdutoDTO } from '../../../models/Produto';
import { ProdutosService } from './produtos.service';

describe('ProdutosService', () => {
  let service: ProdutosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProdutosService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ProdutosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('obter', () => {
    it('deve retornar uma lista de produtos via GET', () => {
      const mockProdutos: ProdutoDTO[] = [
        { id: 1, nome: 'Produto 1', taxa_anual: 5, prazo_maximo: 12 },
      ];

      service.obter().subscribe(produtos => {
        expect(produtos).toEqual(mockProdutos);
      });

      const req = httpMock.expectOne(`${environment.baseURL}/produtos`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProdutos);
    });
  });

  describe('salvar', () => {
    it('deve enviar um novo produto via POST', () => {
      const novoProduto: SalvarProdutoDTO = { nome: 'Produto X', taxa_anual: 5, prazo_maximo: 12 };

      service.salvar(novoProduto).subscribe(response => {
        expect(response).toEqual({ success: true });
      });

      const req = httpMock.expectOne(`${environment.baseURL}/produtos`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(novoProduto);
      req.flush({ success: true });
    });
  });
});
