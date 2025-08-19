import { TestBed } from '@angular/core/testing';

import { SimulacaoContextService } from './simulacao-context.service';

describe('SimulacaoContextService', () => {
  let service: SimulacaoContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulacaoContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
