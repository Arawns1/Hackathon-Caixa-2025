import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  sucesso(mensagem: string) {
    return this.toastr.success(mensagem);
  }

  erro(mensagem: string, descricao?: string) {
    if (descricao) {
      return this.toastr.error(descricao, mensagem);
    }
    return this.toastr.error(mensagem);
  }
}
