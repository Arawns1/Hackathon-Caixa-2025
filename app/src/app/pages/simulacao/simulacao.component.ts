import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { ProdutosContextService } from './../../services/context/produtos/produtos-context.service';
import { NgxMaskDirective } from 'ngx-mask';
import { ProdutoDTO, SalvarProdutoDTO } from '../../models/Produto';
import { SimulacaoService } from '../../services/api/simulacao/simulacao.service';
import { SimulacaoContextService } from '../../services/context/simulacao/simulacao-context.service';

@Component({
  selector: 'app-simulacao',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './simulacao.component.html',
  styleUrl: './simulacao.component.css',
})
export class SimulacaoComponent implements OnInit {
  form: FormGroup;
  produto: ProdutoDTO;

  constructor(
    public produtoContext: ProdutosContextService,
    private simulacaoContext: SimulacaoContextService,
    private router: Router,
  ) {}

  ngOnInit() {
    const produtoContexto = this.produtoContext.produtoSelecionado();
    if (!produtoContexto) {
      alert('Produto não selecionado');
      return this.router.navigate(['']);
    }

    this.produto = produtoContexto;
    return (this.form = new FormGroup({
      id_produto: new FormControl(this.produto.id, [Validators.required]),
      valor_solicitado: new FormControl(1000.0, [Validators.required, Validators.min(1)]),
      prazo: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    }));
  }

  get parcelas(): number[] {
    return Array.from({ length: this.produto.prazo_maximo }, (_, i) => i + 1);
  }

  submit() {
    if (!this.form.valid) return this.form.markAllAsTouched();
    this.simulacaoContext.setSolicitacaoSimulacao(this.form.value);
    this.router.navigate(['/simulacao/resumo']);
  }
}
