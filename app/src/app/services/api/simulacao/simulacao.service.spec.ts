import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { environment } from '../../../../environments/environment.development';
import { RespostaSimulacaoDTO, SimularEmprestimoDTO } from '../../../models/Simulacao';
import { SimulacaoService } from './simulacao.service';

describe('SimulacaoService', () => {
  let service: SimulacaoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimulacaoService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SimulacaoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('deve simular um empréstimo e retornar a resposta esperada', fakeAsync(() => {
    const simulacao: SimularEmprestimoDTO = { id_produto: 1, prazo: 10, valor_solicitado: 10000 };
    const respostaEsperada: RespostaSimulacaoDTO = {
      id: '1',
      produto: { id: 1, nome: 'Produto 01', taxa_anual: 0.01, prazo_maximo: 10 },
      resultado_simulacao: {
        valor_solicitado: 1000,
        prazo: 5,
        parcela_mensal: 200,
        valor_total_em_juros: 50,
        valor_total_amortizado: 1000,
        valor_total_com_juros: 1050,
        taxa_efetiva_mensal: 0.01,
        parcelas: [],
      },
    };
    let resposta: RespostaSimulacaoDTO | undefined;
    service.simular(simulacao).subscribe(res => (resposta = res));
    tick(3000);
    const req = httpMock.expectOne(`${environment.baseURL}/simulacoes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(simulacao);
    req.flush(respostaEsperada);
    expect(resposta).toEqual(respostaEsperada);
  }));
});
