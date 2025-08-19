import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumo-simulacao',
  imports: [MatIconModule, ButtonComponent],
  templateUrl: './resumo-simulacao.component.html',
  styleUrl: './resumo-simulacao.component.css',
})
export class ResumoSimulacaoComponent {
  constructor(private router: Router) {}

  irParaHome() {
    this.router.navigate(['/']);
  }
}
