import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ButtonComponent } from '../../components/button/button.component';
import { ProdutosService } from '../../services/api/produtos/produtos.service';
import { SalvarProdutoDTO } from '../../models/Produto';
import { ToastService } from '../../services/libs/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-produto',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, ButtonComponent],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css',
})
export class CadastroProdutoComponent {
  isLoading = false;
  form = new FormGroup({
    nome: new FormControl<string>('', [Validators.required, Validators.maxLength(200)]),
    taxa_anual: new FormControl<number>(undefined!, [Validators.required]),
    prazo_maximo: new FormControl<number>(undefined!, [
      Validators.required,
      Validators.min(1),
      Validators.max(999),
    ]),
  });

  constructor(
    private produtoService: ProdutosService,
    private toast: ToastService,
    private router: Router,
  ) {}

  submit() {
    if (!this.form.valid) return this.form.markAllAsTouched();
    this.isLoading = true;
    this.produtoService.salvar(this.form.value as SalvarProdutoDTO).subscribe({
      next: () => {
        this.toast.sucesso('Produto cadastrado com sucesso!');
        this.router.navigate(['/produtos']);
      },
      error: () => {
        this.toast.erro('Erro ao cadastrar. Tente novamente mais tarde');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
