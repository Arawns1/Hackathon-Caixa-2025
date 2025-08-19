import { Component } from '@angular/core';
import { CardProdutoComponent } from '../../shared/card-produto/card-produto.component';

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProdutoComponent],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.css',
})
export class ListaProdutosComponent {}
