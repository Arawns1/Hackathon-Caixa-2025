import { TestBed } from '@angular/core/testing';

import { ProdutosContextService } from './produtos-context.service';

describe('ProdutosContextService', () => {
  let service: ProdutosContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
