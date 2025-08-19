import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { DividerComponent } from '../../components/divider/divider.component';

@Component({
  selector: 'app-resumo-simulacao',
  imports: [MatIconModule, ButtonComponent, RouterModule, DividerComponent],
  templateUrl: './resumo-simulacao.component.html',
  styleUrl: './resumo-simulacao.component.css',
})
export class ResumoSimulacaoComponent {
  constructor(private router: Router) {}

  irParaHome() {
    this.router.navigate(['/']);
  }
}
