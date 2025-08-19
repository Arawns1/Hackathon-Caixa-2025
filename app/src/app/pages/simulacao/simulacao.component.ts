import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-simulacao',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatInputModule, ButtonComponent],
  templateUrl: './simulacao.component.html',
  styleUrl: './simulacao.component.css',
})
export class SimulacaoComponent {}
