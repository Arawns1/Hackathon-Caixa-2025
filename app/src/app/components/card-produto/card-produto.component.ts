import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProdutoDTO } from '../../models/Produto';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-card-produto',
  imports: [ButtonComponent],
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.css',
})
export class CardProdutoComponent {
  @Input() produto: ProdutoDTO;
  @Output('onProdutoSelecionado') produtoSelecionado = new EventEmitter<ProdutoDTO>();
  taxaMensal: string = '0.0';

  constructor() {
    if (this.produto) {
      const taxaMensal = Math.pow(1 + this.produto.taxa_anual / 100, 1 / 12) - 1;
      this.taxaMensal = (taxaMensal * 100).toFixed(2);
    }
  }

  selecionarProduto() {
    this.produtoSelecionado.emit(this.produto);
  }
}
