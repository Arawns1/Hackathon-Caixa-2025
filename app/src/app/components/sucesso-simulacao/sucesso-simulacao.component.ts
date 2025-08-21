import { Component } from '@angular/core';
import { AnimationPlayerComponent } from '../animation-player/animation-player.component';

@Component({
  selector: 'app-sucesso-simulacao',
  imports: [AnimationPlayerComponent],
  templateUrl: './sucesso-simulacao.component.html',
  styleUrl: './sucesso-simulacao.component.css',
})
export class SucessoSimulacaoComponent {
  src = 'assets/media/success.lottie';
  mensagemSucesso = 'Tudo certo! Aqui está o resumo da sua simulação.';
}
