import { Component, Input } from '@angular/core';
import { DividerComponent } from '../divider/divider.component';
import { ParcelaSimulacaoDTO } from '../../models/Parcela';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-parcela-item',
  imports: [CommonModule, DividerComponent, CurrencyPipe, MatIconModule],
  templateUrl: './parcela-item.component.html',
  styleUrl: './parcela-item.component.css',
})
export class ParcelaItemComponent {
  @Input() parcela: ParcelaSimulacaoDTO;
  @Input() isExpandido: boolean;
}
