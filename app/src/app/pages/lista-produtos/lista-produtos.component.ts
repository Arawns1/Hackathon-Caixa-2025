import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardProdutoComponent } from '../../components/card-produto/card-produto.component';
import { ProdutoDTO } from '../../models/Produto';
import { ProdutosService } from '../../services/api/produtos/produtos.service';
import { ProdutosContextService } from '../../services/context/produtos/produtos-context.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lista-produtos',
  imports: [CommonModule, CardProdutoComponent],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.css',
})
export class ListaProdutosComponent implements OnInit {
  isLoading = false;
  produtos: ProdutoDTO[] = [];

  constructor(
    private produtosService: ProdutosService,
    private produtoContext: ProdutosContextService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.produtosService
      .obter()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: data => (this.produtos = data),
        error: err => console.error(err),
      });
  }

  handleProdutoSelecionado(produtoSelecionado: ProdutoDTO) {
    this.produtoContext.setProdutoSelecionado(produtoSelecionado);
    this.router.navigate(['/simulacao']);
  }
}
