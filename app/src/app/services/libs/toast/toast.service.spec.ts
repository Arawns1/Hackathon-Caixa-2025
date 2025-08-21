import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { provideToastr, ToastrService } from 'ngx-toastr';

describe('ToastService', () => {
  let service: ToastService;
  let toastr: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService, provideToastr()],
    });
    service = TestBed.inject(ToastService);
    toastr = TestBed.inject(ToastrService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('sucesso', () => {
    it('deve chamar toastr.success com a mensagem correta', () => {
      const spy = spyOn(toastr, 'success');
      const mensagem = 'Operação realizada com sucesso';
      service.sucesso(mensagem);
      expect(spy).toHaveBeenCalledWith(mensagem);
    });
  });

  describe('erro', () => {
    it('deve chamar toastr.error com a mensagem correta', () => {
      const spy = spyOn(toastr, 'error');
      const mensagem = 'Ocorreu um erro';
      service.erro(mensagem);
      expect(spy).toHaveBeenCalledWith(mensagem);
    });
  });
});
