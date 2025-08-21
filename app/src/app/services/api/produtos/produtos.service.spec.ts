import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProdutosService } from './produtos.service';

describe('ProdutosService', () => {
  let service: ProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProdutosService, provideHttpClient()]
    });
    service = TestBed.inject(ProdutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
