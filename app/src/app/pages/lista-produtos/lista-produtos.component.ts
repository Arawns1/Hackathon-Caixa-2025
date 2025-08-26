import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CardProdutoComponent } from '../../components/card-produto/card-produto.component';
import { ProdutoDTO } from '../../models/Produto';
import { ProdutosService } from '../../services/api/produtos/produtos.service';
import { ProdutosContextService } from '../../services/context/produtos/produtos-context.service';
import { ToastService } from '../../services/libs/toast/toast.service';
import { InputBuscaProdutosComponent } from '../../components/input-busca-produtos/input-busca-produtos.component';

@Component({
  selector: 'app-lista-produtos',
  imports: [CommonModule, CardProdutoComponent, InputBuscaProdutosComponent],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.css',
})
export class ListaProdutosComponent implements OnInit {
  isLoading = false;
  produtos: ProdutoDTO[] = [];
  produtosExibidos: ProdutoDTO[] = [];

  constructor(
    private readonly produtosService: ProdutosService,
    private readonly produtoContext: ProdutosContextService,
    private readonly router: Router,
    private readonly toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.produtosService
      .obter()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: data => {
          this.produtos = data;
          this.produtosExibidos = data;
        },
        error: err => {
          this.toast.erro('Erro ao listar produtos. Tente novamente mais tarde');
          this.router.navigate(['/']);
        },
      });
  }

  handleProdutoSelecionado(produtoSelecionado: ProdutoDTO) {
    this.produtoContext.setProdutoSelecionado(produtoSelecionado);
    this.router.navigate(['/simulacao']);
  }

  onProdutosFiltrados(produtosFiltrados: ProdutoDTO[]) {
    this.produtosExibidos = produtosFiltrados;
  }
}
