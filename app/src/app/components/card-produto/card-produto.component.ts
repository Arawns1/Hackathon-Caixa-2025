import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-card-produto',
  imports: [ButtonComponent],
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.css',
})
export class CardProdutoComponent {
  constructor(private router: Router) {}

  irParaSimulacao() {
    this.router.navigate(['/simulacao']); // rota desejada
  }
}
