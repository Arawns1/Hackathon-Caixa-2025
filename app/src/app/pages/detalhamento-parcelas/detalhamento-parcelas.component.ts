import { Component } from '@angular/core';
import { ParcelaItemComponent } from '../../components/parcela-item/parcela-item.component';

@Component({
  selector: 'app-detalhamento-parcelas',
  imports: [ParcelaItemComponent],
  templateUrl: './detalhamento-parcelas.component.html',
  styleUrl: './detalhamento-parcelas.component.css',
})
export class DetalhamentoParcelasComponent {}
