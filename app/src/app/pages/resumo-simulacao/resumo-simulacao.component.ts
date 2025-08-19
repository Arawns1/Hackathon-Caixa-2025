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
  ) {}

  ngOnInit() {
    this.isLoading = true;
    const simulacao = this.simulacaoContext.solicitacaoSimulacao();
    if (!simulacao) {
      alert('Simulacao nao encotrada');
      return this.router.navigate(['/']);
    }

    return this.simulacaoService.simular(simulacao).subscribe({
      next: data => {
        this.resumoSimulacao = data;
        this.simulacaoContext.setRespostaSimulacao(data);
        this.isSimulacaoComSucesso = true;

        setTimeout(() => {
          this.isSimulacaoComSucesso = false;
          this.mostrarResumo = true;
        }, 2500);
      },
      error: err => console.error(err),
      complete: () => (this.isLoading = false),
    });
  }

  irParaHome() {
    this.router.navigate(['/']);
  }
}
