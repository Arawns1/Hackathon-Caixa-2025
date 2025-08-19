import { TestBed } from '@angular/core/testing';

import { SimulacaoService } from './simulacao.service';

describe('SimulacaoService', () => {
  let service: SimulacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
