import { Component, Input } from '@angular/core';
import { DividerComponent } from '../divider/divider.component';
import { ParcelaSimulacaoDTO } from '../../models/Parcela';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-parcela-item',
  imports: [DividerComponent, CurrencyPipe],
  templateUrl: './parcela-item.component.html',
  styleUrl: './parcela-item.component.css',
})
export class ParcelaItemComponent {
  @Input() parcela: ParcelaSimulacaoDTO;
  @Input() numeroParcela: number;
}
