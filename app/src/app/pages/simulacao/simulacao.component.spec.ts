import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulacaoComponent } from './simulacao.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ButtonComponent } from '../../components/button/button.component';
import { SimulacaoContextService } from '../../services/context/simulacao/simulacao-context.service';
import { ProdutosContextService } from '../../services/context/produtos/produtos-context.service';
import { ToastService } from '../../services/libs/toast/toast.service';
import { provideToastr } from 'ngx-toastr';
import { Router } from '@angular/router';

describe('SimulacaoComponent', () => {
  let component: SimulacaoComponent;
  let fixture: ComponentFixture<SimulacaoComponent>;
  let produtosContext: ProdutosContextService;
  let simulacaoContext: SimulacaoContextService;
  let router: Router;
  let toast: ToastService;
  let produtoContextSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SimulacaoComponent,
        CommonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ButtonComponent,
        ReactiveFormsModule,
        NgxMaskDirective,
      ],
      providers: [
        provideRouter([]),
        provideAnimations(),
        provideNgxMask(),
        provideToastr(),
        SimulacaoContextService,
        ProdutosContextService,
        ToastService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SimulacaoComponent);
    component = fixture.componentInstance;

    produtosContext = TestBed.inject(ProdutosContextService);
    simulacaoContext = TestBed.inject(SimulacaoContextService);
    router = TestBed.inject(Router);
    toast = TestBed.inject(ToastService);

    produtoContextSpy = spyOn(produtosContext, 'produtoSelecionado').and.returnValue({
      id: 1,
      nome: 'Produto Teste',
      prazo_maximo: 5,
      taxa_anual: 0.1,
    });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('deve limpar a resposta da simulação ao iniciar', () => {
    spyOn(simulacaoContext, 'limparRespostaSimulacao');
    component.ngOnInit();
    expect(simulacaoContext.limparRespostaSimulacao).toHaveBeenCalled();
  });

  it('deve inicializar o formulário quando houver produto selecionado', () => {
    component.ngOnInit();
    expect(component.form).toBeTruthy();
    expect(component.form.get('id_produto')?.value).toBe(1);
    expect(component.produto.nome).toBe('Produto Teste');
  });

  it('deve mostrar erro e navegar se não houver produto selecionado', () => {
    produtoContextSpy.and.returnValue(null);

    spyOn(toast, 'erro');
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(toast.erro).toHaveBeenCalledWith(
      'Erro ao realizar simulação. Tente novamente mais tarde',
    );
    expect(router.navigate).toHaveBeenCalledWith(['']);
    expect(component.form).toBeUndefined();
    expect(component.produto).toBeUndefined();
  });

  it('deve inicializar o formulário com valores corretos', () => {
    component.ngOnInit();
    expect(component.form).toBeTruthy();
    expect(component.form.get('id_produto')?.value).toBe(1);
    expect(component.form.get('valor_solicitado')?.value).toBe(1000.0);
    expect(component.form.get('prazo')?.value).toBe('');
  });

  it('deve gerar corretamente a lista de parcelas', () => {
    component.ngOnInit();
    expect(component.parcelas).toEqual([1, 2, 3, 4, 5]);
  });

  it('não deve submeter o formulário se estiver inválido', () => {
    component.ngOnInit();
    spyOn(simulacaoContext, 'setSolicitacaoSimulacao');
    component.form.get('prazo')?.setValue(null);
    component.submit();
    expect(simulacaoContext.setSolicitacaoSimulacao).not.toHaveBeenCalled();
  });

  it('deve submeter o formulário e navegar para resumo', () => {
    component.ngOnInit();
    spyOn(simulacaoContext, 'setSolicitacaoSimulacao');
    spyOn(router, 'navigate');

    component.form.get('prazo')?.setValue(3);
    component.submit();

    expect(simulacaoContext.setSolicitacaoSimulacao).toHaveBeenCalledWith(component.form.value);
    expect(router.navigate).toHaveBeenCalledWith(['/simulacao/resumo']);
  });

  it('deve marcar todos os campos como tocados se o formulário for inválido', () => {
    component.ngOnInit();
    spyOn(component.form, 'markAllAsTouched');
    spyOn(simulacaoContext, 'setSolicitacaoSimulacao');
    spyOn(router, 'navigate');

    component.form.get('prazo')?.setValue(null);
    component.submit();

    expect(component.form.markAllAsTouched).toHaveBeenCalled();
    expect(simulacaoContext.setSolicitacaoSimulacao).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
