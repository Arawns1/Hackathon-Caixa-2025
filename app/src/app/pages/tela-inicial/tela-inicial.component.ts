import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardMenuComponent } from '../../components/card-menu/card-menu.component';

@Component({
  selector: 'app-tela-inicial',
  imports: [RouterModule, CardMenuComponent],
  templateUrl: './tela-inicial.component.html',
  styleUrl: './tela-inicial.component.css',
})
export class TelaInicialComponent {
  constructor(private readonly router: Router) {}

  redirecionar(rota: string) {
    this.router.navigate([rota]);
  }
}
