import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParcelaItemComponent } from '../../components/parcela-item/parcela-item.component';
import { ParcelaSimulacaoDTO } from '../../models/Parcela';
import { SimulacaoContextService } from '../../services/context/simulacao/simulacao-context.service';
import { ToastService } from '../../services/libs/toast/toast.service';
import { RespostaSimulacaoDTO } from '../../models/Simulacao';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DividerComponent } from '../../components/divider/divider.component';

@Component({
  selector: 'app-detalhamento-parcelas',
  imports: [CommonModule, ParcelaItemComponent, CdkAccordionModule, DividerComponent],
  templateUrl: './detalhamento-parcelas.component.html',
  styleUrl: './detalhamento-parcelas.component.css',
})
export class DetalhamentoParcelasComponent implements OnInit {
  resumoSimulacao: RespostaSimulacaoDTO;
  parcelas: ParcelaSimulacaoDTO[];
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;

  constructor(
    private router: Router,
    private simulacaoContext: SimulacaoContextService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    const respostaSimulacao = this.simulacaoContext.respostaSimulacao();
    if (!respostaSimulacao) {
      this.toast.erro('Erro ao visualizar parcelas. Tente novamente mais tarde');
      return this.router.navigate(['/']);
    }
    this.resumoSimulacao = respostaSimulacao;
    return (this.parcelas = respostaSimulacao.resultado_simulacao.parcelas);
  }
}
