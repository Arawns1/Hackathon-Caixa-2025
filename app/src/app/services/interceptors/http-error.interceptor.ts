import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../libs/toast/toast.service';

const handleError = (toast: ToastService, router: Router, status: number, detalhe?: string) => {
  switch (status) {
    case 400:
      toast.erro('Erro ao validar informações', detalhe);
      break;
    case 404:
      toast.erro(detalhe || 'Recurso não encontrado');
      break;
    case 500:
      toast.erro('Ocorreu um erro interno. Tente novamente mais tarde!');
      break;
    default:
      toast.erro('Ocorreu um erro inesperado.');
  }

  if ([400, 404, 500].includes(status)) {
    router.navigate(['/']);
  }
};

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      handleError(toast, router, error.status, error.error?.detalhe);
      return throwError(() => error);
    }),
  );
};
