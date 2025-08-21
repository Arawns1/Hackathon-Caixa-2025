import { TestBed } from '@angular/core/testing';
import { SimulacaoContextService } from './simulacao-context.service';
import { SimularEmprestimoDTO, RespostaSimulacaoDTO } from '../../../models/Simulacao';

describe('SimulacaoContextService', () => {
  let service: SimulacaoContextService;
  const mockSolicitacao: SimularEmprestimoDTO = {
    id_produto: 1,
    valor_solicitado: 1000,
    prazo: 5,
  };
  const mockResposta: RespostaSimulacaoDTO = {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimulacaoContextService],
    });
    service = TestBed.inject(SimulacaoContextService);
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  describe('setSolicitacaoSimulacao', () => {
    it('deve atualizar a solicitacaoSimulacao corretamente', () => {
      service.setSolicitacaoSimulacao(mockSolicitacao);
      expect(service.solicitacaoSimulacao()).toEqual(mockSolicitacao);
    });
  });

  describe('setRespostaSimulacao', () => {
    it('deve atualizar a respostaSimulacao corretamente', () => {
      const mockResposta: RespostaSimulacaoDTO = {
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
      service.setRespostaSimulacao(mockResposta);
      expect(service.respostaSimulacao()).toEqual(mockResposta);
    });

    it('deve permitir setar respostaSimulacao como null', () => {
      service.setRespostaSimulacao(null);
      expect(service.respostaSimulacao()).toBeNull();
    });
  });

  describe('limparSolicitacaoSimulacao', () => {
    it('deve limpar a solicitacaoSimulacao', () => {
      service.setSolicitacaoSimulacao(mockSolicitacao);
      service.limparSolicitacaoSimulacao();
      expect(service.solicitacaoSimulacao()).toBeNull();
    });
  });

  describe('limparRespostaSimulacao', () => {
    it('deve limpar a respostaSimulacao', () => {
      service.setRespostaSimulacao(mockResposta);
      service.limparRespostaSimulacao();
      expect(service.respostaSimulacao()).toBeNull();
    });
  });
});
