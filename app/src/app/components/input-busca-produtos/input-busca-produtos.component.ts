import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ProdutoDTO } from '../../models/Produto';
import { BuscarProdutosService } from '../../services/integration/busca/buscar-produtos.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-busca-produtos',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './input-busca-produtos.component.html',
  styleUrl: './input-busca-produtos.component.css',
})
export class InputBuscaProdutosComponent {
  @Input() produtos: ProdutoDTO[] = [];
  @Output() produtosFiltrados = new EventEmitter<ProdutoDTO[]>();

  termoBusca = '';
  private readonly buscaSubject = new Subject<string>();

  constructor(private readonly buscaService: BuscarProdutosService) {
    this.buscaSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe(termo => {
      const produtosFiltrados = this.buscaService.buscarFuzzy(this.produtos, termo);
      this.produtosFiltrados.emit(produtosFiltrados);
    });
  }

  onBuscaChange(termo: string): void {
    this.buscaSubject.next(termo);
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.produtosFiltrados.emit(this.produtos);
  }
}
