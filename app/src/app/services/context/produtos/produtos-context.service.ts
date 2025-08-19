import { Injectable, Signal, signal } from '@angular/core';
import { ProdutoDTO } from '../../../models/Produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutosContextService {
  private _produtoSelecionado = signal<ProdutoDTO | null>(null);

  produtoSelecionado: Signal<ProdutoDTO | null> = this._produtoSelecionado;

  setProdutoSelecionado(produto: ProdutoDTO) {
    this._produtoSelecionado.set(produto);
  }
}
