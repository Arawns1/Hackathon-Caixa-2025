import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { provideRouter, Router } from '@angular/router';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ParcelaItemComponent } from '../../components/parcela-item/parcela-item.component';
import { DividerComponent } from '../../components/divider/divider.component';
import { SimulacaoContextService } from '../../services/context/simulacao/simulacao-context.service';
import { ToastService } from '../../services/libs/toast/toast.service';
import { DetalhamentoParcelasComponent } from './detalhamento-parcelas.component';
import { provideToastr } from 'ngx-toastr';
import { RespostaSimulacaoDTO } from '../../models/Simulacao';
import { ParcelaSimulacaoDTO } from '../../models/Parcela';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { By } from '@angular/platform-browser';

describe('DetalhamentoParcelasComponent', () => {
  let component: DetalhamentoParcelasComponent;
  let fixture: ComponentFixture<DetalhamentoParcelasComponent>;
  let simulacaoContext: jasmine.SpyObj<SimulacaoContextService>;
  let toast: jasmine.SpyObj<ToastService>;
  let router: Router;
  const parcelasMock: ParcelaSimulacaoDTO[] = [
    {
      numero: 1,
      saldo_devedor: 10,
      valor_amortizacao: 10,
      valor_juros: 10,
      valor_prestacao: 10,
    },
  ];

  const resumoSimulacaoMock: RespostaSimulacaoDTO = {
    id: '1',
    produto: {
      id: 1,
      nome: 'Produto 1',
      prazo_maximo: 10,
      taxa_anual: 10,
    },
    resultado_simulacao: {
      parcela_mensal: 10,
      parcelas: parcelasMock,
      prazo: 10,
      taxa_efetiva_mensal: 10,
      valor_solicitado: 10,
      valor_total_amortizado: 10,
      valor_total_com_juros: 10,
      valor_total_em_juros: 10,
    },
  };

  beforeEach(async () => {
    registerLocaleData(localePt);
    simulacaoContext = jasmine.createSpyObj('SimulacaoContextService', ['respostaSimulacao']);
    toast = jasmine.createSpyObj('ToastService', ['erro']);

    await TestBed.configureTestingModule({
      imports: [
        DetalhamentoParcelasComponent,
        CommonModule,
        ParcelaItemComponent,
        CdkAccordionModule,
        DividerComponent,
      ],
      providers: [
        provideRouter([]),
        { provide: SimulacaoContextService, useValue: simulacaoContext },
        { provide: ToastService, useValue: toast },
        provideToastr(),
        { provide: LOCALE_ID, useValue: 'pt-BR' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhamentoParcelasComponent);
    component = fixture.componentInstance;
    component.resumoSimulacao = resumoSimulacaoMock;
    component.parcelas = parcelasMock;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir erro e navegar se não houver respostaSimulacao', () => {
    simulacaoContext.respostaSimulacao.and.returnValue(null);
    spyOn(router, 'navigate');
    component.ngOnInit();

    expect(toast.erro).toHaveBeenCalledWith(
      'Erro ao visualizar parcelas. Tente novamente mais tarde',
    );
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('deve carregar o resumoSimulacao corretamente', () => {
    simulacaoContext.respostaSimulacao.and.returnValue(resumoSimulacaoMock);
    component.ngOnInit();
    expect(component.resumoSimulacao).toEqual(resumoSimulacaoMock);
    expect(component.parcelas).toEqual(resumoSimulacaoMock.resultado_simulacao.parcelas);
  });

  it('deve exibir o título corretamente', () => {
    const titulo = fixture.debugElement.query(By.css('[data-test-id="titulo-parcelas"]'));
    expect(titulo.nativeElement.textContent.trim()).toBe('Detalhe das Parcelas Mês a Mês');
  });

  it('deve exibir o número de parcelas corretamente', () => {
    const numeroParcelas = fixture.debugElement.query(By.css('[data-test-id="numero-parcelas"]'));
    const spans = numeroParcelas.queryAll(By.css('span'));
    expect(spans[0].nativeElement.textContent.trim()).toBe('10x de');
    expect(spans[1].nativeElement.textContent.trim()).toBe('R$ 10,00');
  });

  it('deve renderizar a primeira parcela corretamente', () => {
    const primeiraParcela = fixture.debugElement.query(
      By.css('app-parcela-item[data-test-id="parcela-0"]'),
    );
    expect(primeiraParcela).toBeTruthy();
  });
});
