import { Injectable, Signal, signal } from '@angular/core';
import { RespostaSimulacaoDTO, SimularEmprestimoDTO } from '../../../models/Simulacao';

@Injectable({
  providedIn: 'root',
})
export class SimulacaoContextService {
  private _solicitacaoSimulacao = signal<SimularEmprestimoDTO | null>(null);
  private _respostaSimulacao = signal<RespostaSimulacaoDTO | null>(null);

  solicitacaoSimulacao: Signal<SimularEmprestimoDTO | null> = this._solicitacaoSimulacao;
  respostaSimulacao: Signal<RespostaSimulacaoDTO | null> = this._respostaSimulacao;

  setSolicitacaoSimulacao(solicitacaoSimulacao: SimularEmprestimoDTO) {
    this._solicitacaoSimulacao.set(solicitacaoSimulacao);
  }

  setRespostaSimulacao(respostaSimulacao: RespostaSimulacaoDTO | null) {
    this._respostaSimulacao.set(respostaSimulacao);
  }

  limparSolicitacaoSimulacao() {
    this._solicitacaoSimulacao.set(null);
  }

  limparRespostaSimulacao() {
    this._respostaSimulacao.set(null);
  }
}
