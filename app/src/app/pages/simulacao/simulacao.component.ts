import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulacao',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatInputModule, ButtonComponent],
  templateUrl: './simulacao.component.html',
  styleUrl: './simulacao.component.css',
})
export class SimulacaoComponent {
  constructor(private router: Router) {}

  irParaResumoSimulacao() {
    this.router.navigate(['/simulacao/resumo']);
  }
}
