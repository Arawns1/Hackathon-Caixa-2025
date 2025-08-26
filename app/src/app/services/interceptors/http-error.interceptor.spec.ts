import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { throwError, firstValueFrom, of } from 'rxjs';
import { ToastService } from '../libs/toast/toast.service';
import { httpErrorInterceptor } from './http-error.interceptor';

describe('httpErrorInterceptor', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let toastSpy: jasmine.SpyObj<ToastService>;
  let interceptor: HttpInterceptorFn;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    toastSpy = jasmine.createSpyObj('ToastService', ['erro']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ToastService, useValue: toastSpy },
      ],
    });

    interceptor = (req, next) =>
      TestBed.runInInjectionContext(() => httpErrorInterceptor(req, next));
  });

  function executarInterceptorComErro(status: number, detalhe?: string) {
    const req: any = {};
    const next = (r: any) =>
      throwError(() => new HttpErrorResponse({ status, error: { detalhe } }));
    return firstValueFrom(interceptor(req, next));
  }

  it('deve passar normalmente quando não ocorre erro', fakeAsync(async () => {
    const req: any = {};

    const resposta = new HttpResponse({ body: { sucesso: true } });
    const next = (r: any) => of(resposta);

    const resultado = await firstValueFrom(interceptor(req, next));
    expect(resultado).toBe(resposta);
    expect(toastSpy.erro).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));

  it('deve mostrar toast de erro 400 e navegar', fakeAsync(async () => {
    await executarInterceptorComErro(400, 'Detalhe do erro').catch(() => {});
    expect(toastSpy.erro).toHaveBeenCalledWith('Erro ao validar informações', 'Detalhe do erro');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('deve mostrar toast de erro 404 e navegar', fakeAsync(async () => {
    await executarInterceptorComErro(404, 'Não encontrado').catch(() => {});
    expect(toastSpy.erro).toHaveBeenCalledWith('Não encontrado');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('deve mostrar toast de erro 500 e navegar', fakeAsync(async () => {
    await executarInterceptorComErro(500).catch(() => {});
    expect(toastSpy.erro).toHaveBeenCalledWith(
      'Ocorreu um erro interno. Tente novamente mais tarde!',
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  }));
});
