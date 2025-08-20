import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CardMenuComponent } from '../../components/card-menu/card-menu.component';

@Component({
  selector: 'app-tela-inicial',
  imports: [RouterModule, CardMenuComponent],
  templateUrl: './tela-inicial.component.html',
  styleUrl: './tela-inicial.component.css',
})
export class TelaInicialComponent {}
