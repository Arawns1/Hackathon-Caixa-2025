import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { SimulacaoService } from './simulacao.service';

describe('SimulacaoService', () => {
  let service: SimulacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SimulacaoService, provideHttpClient()]
    });
    service = TestBed.inject(SimulacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
