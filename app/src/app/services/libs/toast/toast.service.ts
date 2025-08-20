import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  sucesso(mensagem: string) {
    this.toastr.success(mensagem);
  }

  erro(mensagem: string) {
    this.toastr.error(mensagem);
  }
}
