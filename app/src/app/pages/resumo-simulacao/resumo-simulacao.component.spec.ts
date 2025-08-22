import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { Router, RouterModule, provideRouter } from '@angular/router';
import { asyncScheduler, of } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { ButtonComponent } from '../../components/button/button.component';
import { DividerComponent } from '../../components/divider/divider.component';
import { LoadingSimulacaoComponent } from '../../components/loading-simulacao/loading-simulacao.component';
import { SucessoSimulacaoComponent } from '../../components/sucesso-simulacao/sucesso-simulacao.component';
import { RespostaSimulacaoDTO, SimularEmprestimoDTO } from '../../models/Simulacao';
import { SimulacaoService } from '../../services/api/simulacao/simulacao.service';
import { SimulacaoContextService } from '../../services/context/simulacao/simulacao-context.service';
import { ToastService } from '../../services/libs/toast/toast.service';
import { ResumoSimulacaoComponent } from './resumo-simulacao.component';

describe('ResumoSimulacaoComponent', () => {
  let component: ResumoSimulacaoComponent;
  let fixture: ComponentFixture<ResumoSimulacaoComponent>;
  let simulacaoContext: jasmine.SpyObj<SimulacaoContextService>;
  let simulacaoService: jasmine.SpyObj<SimulacaoService>;
  let toast: jasmine.SpyObj<ToastService>;
  let router: Router;

  const mockResposta: RespostaSimulacaoDTO = {
    id: '1',
    produto: { id: 1, nome: 'Produto 01', taxa_anual: 0.01, prazo_maximo: 10 },
    resultado_simulacao: {
      valor_solicitado: 1000,
      prazo: 5,
      parcela_mensal: 200,
      valor_total_em_juros: 50,
      valor_total_amortizado: 1000,
      valor_total_com_juros: 1050,
      taxa_efetiva_mensal: 0.01,
      parcelas: [],
    },
  };

  beforeEach(async () => {
    registerLocaleData(localePt);
    simulacaoContext = jasmine.createSpyObj('SimulacaoContextService', [
      'respostaSimulacao',
      'solicitacaoSimulacao',
      'setRespostaSimulacao',
    ]);
    simulacaoService = jasmine.createSpyObj('SimulacaoService', ['simular']);
    toast = jasmine.createSpyObj('ToastService', ['erro']);

    await TestBed.configureTestingModule({
      imports: [
        ResumoSimulacaoComponent,
        CommonModule,
        MatIconModule,
        ButtonComponent,
        DividerComponent,
        LoadingSimulacaoComponent,
        SucessoSimulacaoComponent,
        CurrencyPipe,
        RouterModule,
      ],
      providers: [
        { provide: SimulacaoContextService, useValue: simulacaoContext },
        { provide: SimulacaoService, useValue: simulacaoService },
        { provide: ToastService, useValue: toast },
        provideRouter([]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ResumoSimulacaoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve mostrar erro e navegar se não houver solicitacaoSimulacao', () => {
    spyOn(router, 'navigate');
    simulacaoContext.respostaSimulacao.and.returnValue(null);
    simulacaoContext.solicitacaoSimulacao.and.returnValue(null);

    component.ngOnInit();

    expect(toast.erro).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(component.mostrarResumo).toBeFalse();
    expect(component.isLoading).toBeFalse();
    expect(component.isSimulacaoComSucesso).toBeFalse();
  });

  it('deve mostrar resumo se já existir respostaSimulacao', () => {
    simulacaoContext.respostaSimulacao.and.returnValue(mockResposta);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.resumoSimulacao).toEqual(mockResposta);
    expect(component.mostrarResumo).toBeTrue();
    expect(component.isLoading).toBeFalse();
    expect(component.isSimulacaoComSucesso).toBeFalse();
  });

  it('deve chamar simular se houver solicitacaoSimulacao e não houver resposta', fakeAsync(() => {
    const mockSolicitacao: SimularEmprestimoDTO = {
      id_produto: 1,
      valor_solicitado: 1000,
      prazo: 5,
    };

    simulacaoContext.respostaSimulacao.and.returnValue(null);
    simulacaoContext.solicitacaoSimulacao.and.returnValue(mockSolicitacao);
    simulacaoService.simular.and.returnValue(of(mockResposta).pipe(observeOn(asyncScheduler)));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLoading).toBeTrue();

    tick();
    fixture.detectChanges();

    expect(component.resumoSimulacao).toEqual(mockResposta);
    expect(component.isLoading).toBeFalse();
    expect(component.isSimulacaoComSucesso).toBeTrue();
    expect(simulacaoContext.setRespostaSimulacao).toHaveBeenCalledWith(mockResposta);

    tick(2500);
    fixture.detectChanges();

    expect(component.isSimulacaoComSucesso).toBeFalse();
    expect(component.mostrarResumo).toBeTrue();
  }));

  it('deve exibir componente de loading', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('[data-test-id="loading-container"]'));
    expect(el).toBeTruthy();
  });

  it('deve exibir componente de sucesso', () => {
    component.isSimulacaoComSucesso = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('[data-test-id="sucesso-container"]'));
    expect(el).toBeTruthy();
  });

  it('deve exibir componente de resumo', () => {
    component.mostrarResumo = true;
    component.resumoSimulacao = mockResposta;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('[data-test-id="resumo-container"]'));
    expect(el).toBeTruthy();
  });

  it('deve navegar para home ao clicar em Fechar', () => {
    spyOn(router, 'navigate');
    component.irParaHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
