import { Component, OnInit } from '@angular/core';
import { AnimationPlayerComponent } from '../animation-player/animation-player.component';

@Component({
  selector: 'app-loading-simulacao',
  imports: [AnimationPlayerComponent],
  templateUrl: './loading-simulacao.component.html',
  styleUrl: './loading-simulacao.component.css',
})
export class LoadingSimulacaoComponent implements OnInit {
  mensagensLoading = [
    'Simulando empréstimo...',
    'Calculando parcelas...',
    'Verificando limites e condições...',
    'Aguarde, processando dados...',
    'Isso está demorando um pouco mais que o esperado, por favor aguarde...',
  ];
  mensagemAtual = this.mensagensLoading[0];
  src = 'assets/media/loading.lottie';

  stopInterval!: () => void;

  ngOnInit() {
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.mensagensLoading.length - 1) {
        index++;
        this.mensagemAtual = this.mensagensLoading[index];
      }
    }, 3000);

    this.stopInterval = () => clearInterval(interval);
  }
}
