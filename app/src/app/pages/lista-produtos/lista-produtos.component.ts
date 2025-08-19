import { Component } from '@angular/core';
import { CardProdutoComponent } from '../../shared/card-produto/card-produto.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProdutoComponent, RouterModule],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.css',
})
export class ListaProdutosComponent {}
