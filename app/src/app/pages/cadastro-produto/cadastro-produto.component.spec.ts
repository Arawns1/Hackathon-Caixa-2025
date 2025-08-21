import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { CadastroProdutoComponent } from './cadastro-produto.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ProdutosService } from '../../services/api/produtos/produtos.service';
import { ToastService } from '../../services/libs/toast/toast.service';
import { asyncScheduler, observeOn, of, throwError } from 'rxjs';

describe('CadastroProdutoComponent', () => {
  let component: CadastroProdutoComponent;
  let fixture: ComponentFixture<CadastroProdutoComponent>;
  let toast: jasmine.SpyObj<ToastService>;
  let produtosService: jasmine.SpyObj<ProdutosService>;
  let router: Router;

  beforeEach(async () => {
    produtosService = jasmine.createSpyObj('ProdutosService', ['salvar']);
    toast = jasmine.createSpyObj('ToastService', ['sucesso', 'erro']);

    await TestBed.configureTestingModule({
      imports: [
        CadastroProdutoComponent,
        CommonModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        ButtonComponent,
      ],
      providers: [
        provideRouter([]),
        provideNgxMask(),
        provideHttpClient(),
        provideToastr(),
        { provide: ProdutosService, useValue: produtosService },
        { provide: ToastService, useValue: toast },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroProdutoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com controles vazios', () => {
    const form = component.form;
    expect(form.get('nome')?.value).toBe('');
    expect(form.get('taxa_anual')?.value).toBeNull();
    expect(form.get('prazo_maximo')?.value).toBeNull();
  });

  it('deve exibir mensagem de erro quando campos obrigatórios são tocados e inválidos', () => {
    component.form.get('nome')?.markAsTouched();
    component.form.get('prazo_maximo')?.markAsTouched();
    fixture.detectChanges();

    const nomeErro = fixture.debugElement.query(By.css('small')).nativeElement;
    expect(nomeErro.textContent).toContain('Nome é obrigatório');
  });

  it('não deve chamar salvar se o formulário for inválido', () => {
    component.form.get('nome')?.setValue('');
    component.submit();
    expect(component.form.touched).toBeTrue();
    expect(produtosService.salvar).not.toHaveBeenCalled();
  });

  it('deve cadastrar produto com sucesso', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.form.setValue({ nome: 'Produto X', taxa_anual: 5, prazo_maximo: 12 });
    produtosService.salvar.and.returnValue(of({}).pipe(observeOn(asyncScheduler)));

    component.submit();
    expect(component.isLoading).toBeTrue();
    tick();
    expect(toast.sucesso).toHaveBeenCalledWith('Produto cadastrado com sucesso!');
    expect(router.navigate).toHaveBeenCalledWith(['/produtos']);
    expect(component.isLoading).toBeFalse();
  }));

  it('deve mostrar erro se salvar falhar', fakeAsync(() => {
    component.form.setValue({ nome: 'Produto X', taxa_anual: 5, prazo_maximo: 12 });
    produtosService.salvar.and.returnValue(
      throwError(() => new Error('erro')).pipe(observeOn(asyncScheduler)),
    );

    component.submit();
    expect(component.isLoading).toBeTrue();
    tick();
    expect(toast.erro).toHaveBeenCalledWith('Erro ao cadastrar. Tente novamente mais tarde');
    expect(component.isLoading).toBeFalse();
  }));

  it('deve definir isLoading como false no complete, mesmo após erro', fakeAsync(() => {
    component.form.setValue({ nome: 'Produto X', taxa_anual: 5, prazo_maximo: 12 });
    produtosService.salvar.and.returnValue(
      throwError(() => new Error('erro')).pipe(observeOn(asyncScheduler)),
    );

    component.submit();
    expect(component.isLoading).toBeTrue();
    tick();
    expect(component.isLoading).toBeFalse();
  }));
});
