import { Injectable } from '@angular/core';
import { ProdutoDTO } from '../../../models/Produto';

@Injectable({
  providedIn: 'root',
})
export class BuscarProdutosService {
  public buscarFuzzy(produtos: ProdutoDTO[], termo: string): ProdutoDTO[] {
    if (!termo.trim()) return produtos;

    const termoLower = termo.toLowerCase();
    const palavrasSeparadas = this.separarTermosPorEspaços(termoLower);

    return produtos.filter(produto => {
      const produtoEmTexto = this.criarTextoBusca(produto);
      return palavrasSeparadas.every(palavra => produtoEmTexto.includes(palavra));
    });
  }

  private separarTermosPorEspaços(termo: string) {
    return termo.split(/\s+/).filter(word => word.length > 0);
  }

  private criarTextoBusca(produto: ProdutoDTO): string {
    const nome = produto.nome || '';
    const taxaAnual = produto.taxa_anual?.toString() || '';
    const prazoMaximo = produto.prazo_maximo?.toString() || '';

    return `${nome.toLowerCase()} ${taxaAnual} ${prazoMaximo}`;
  }
}
