import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProdutoDTO } from '../../models/Produto';
import { ButtonComponent } from '../button/button.component';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-card-produto',
  imports: [ButtonComponent, PercentPipe],
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.css',
})
export class CardProdutoComponent {
  @Input() produto: ProdutoDTO;
  @Output('onProdutoSelecionado') produtoSelecionado = new EventEmitter<ProdutoDTO>();

  selecionarProduto() {
    this.produtoSelecionado.emit(this.produto);
  }
}
