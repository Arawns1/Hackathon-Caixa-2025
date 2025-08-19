import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardProdutoComponent } from '../../components/card-produto/card-produto.component';
import { ProdutoDTO } from '../../models/Produto';
import { ProdutosService } from '../../services/api/produtos/produtos.service';
import { CommonModule } from '@angular/common';
import { ProdutosContextService } from '../../services/context/produtos/produtos-context.service';

@Component({
  selector: 'app-lista-produtos',
  imports: [CommonModule, CardProdutoComponent, RouterModule],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.css',
})
export class ListaProdutosComponent implements OnInit {
  produtos: ProdutoDTO[] = [];

  constructor(
    private produtosService: ProdutosService,
    private produtoContext: ProdutosContextService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.produtosService.obter().subscribe({
      next: data => (this.produtos = data),
      error: err => console.error(err),
    });
  }

  handleProdutoSelecionado(produtoSelecionado: ProdutoDTO) {
    this.produtoContext.setProdutoSelecionado(produtoSelecionado);
    this.router.navigate(['/simulacao']);
  }
}
