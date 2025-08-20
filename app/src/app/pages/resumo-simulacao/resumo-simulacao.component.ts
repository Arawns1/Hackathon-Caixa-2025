import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { DividerComponent } from '../../components/divider/divider.component';
import { LoadingSimulacaoComponent } from '../../components/loading-simulacao/loading-simulacao.component';
import { RespostaSimulacaoDTO } from '../../models/Simulacao';
import { SimulacaoService } from '../../services/api/simulacao/simulacao.service';
import { SimulacaoContextService } from '../../services/context/simulacao/simulacao-context.service';
import { SucessoSimulacaoComponent } from '../../components/sucesso-simulacao/sucesso-simulacao.component';
import { ToastService } from '../../services/libs/toast/toast.service';

@Component({
  selector: 'app-resumo-simulacao',
  imports: [
    CommonModule,
    MatIconModule,
    ButtonComponent,
    RouterModule,
    DividerComponent,
    CurrencyPipe,
    LoadingSimulacaoComponent,
    SucessoSimulacaoComponent,
  ],
  templateUrl: './resumo-simulacao.component.html',
  styleUrl: './resumo-simulacao.component.css',
})
export class ResumoSimulacaoComponent implements OnInit {
  isLoading = true;
  isSimulacaoComSucesso = false;
  mostrarResumo = false;
  resumoSimulacao: RespostaSimulacaoDTO;

  constructor(
    private router: Router,
    private simulacaoContext: SimulacaoContextService,
    private simulacaoService: SimulacaoService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    const simulacao = this.simulacaoContext.solicitacaoSimulacao();
    if (!simulacao) {
      this.toast.erro('Erro ao visualizar simulação. Tente novamente mais tarde');
      this.router.navigate(['/']);
      return;
    }

    this.isLoading = true;
    this.simulacaoService.simular(simulacao).subscribe({
      next: data => {
        this.resumoSimulacao = data;
        this.simulacaoContext.setRespostaSimulacao(data);
        this.isLoading = false;
        this.isSimulacaoComSucesso = true;

        setTimeout(() => {
          this.isSimulacaoComSucesso = false;
          this.mostrarResumo = true;
        }, 2500);
      },
      error: err => {
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  irParaHome() {
    this.simulacaoContext.setRespostaSimulacao(null);
    this.router.navigate(['/']);
  }
}
