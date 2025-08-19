import { Component } from '@angular/core';
import { AnimationPlayerComponent } from '../animation-player/animation-player.component';

@Component({
  selector: 'app-sucesso-simulacao',
  imports: [AnimationPlayerComponent],
  templateUrl: './sucesso-simulacao.component.html',
  styleUrl: './sucesso-simulacao.component.css',
})
export class SucessoSimulacaoComponent {
  src = 'https://lottie.host/28565d1c-e3ad-4b39-9d76-36d60978c4a2/odkwLGAXoq.lottie';
  mensagemSucesso = 'Tudo certo! Aqui está o resumo da sua simulação.';
}
