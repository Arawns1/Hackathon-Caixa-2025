import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-cadastro-produto',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, ButtonComponent],
  providers: [provideNgxMask()],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css',
})
export class CadastroProdutoComponent {
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    taxa: new FormControl('', [Validators.required]),
    prazo: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(999)]),
  });

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
