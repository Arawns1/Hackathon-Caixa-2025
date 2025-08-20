import { ParcelaSimulacaoDTO } from './Parcela';
import { ProdutoDTO } from './Produto';
export interface SimularEmprestimoDTO {
  id_produto: number;
  valor_solicitado: number;
  prazo: number;
}

export interface RespostaSimulacaoDTO {
  id: string;
  produto: ProdutoDTO;
  resultado_simulacao: {
    valor_solicitado: number;
    prazo: number;
    taxa_efetiva_mensal: number;
    parcela_mensal: number;
    valor_total_com_juros: number;
    parcelas: ParcelaSimulacaoDTO[];
  };
}
