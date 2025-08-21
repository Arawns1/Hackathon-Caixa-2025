import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
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

describe('DetalhamentoParcelasComponent', () => {
  let component: DetalhamentoParcelasComponent;
  let fixture: ComponentFixture<DetalhamentoParcelasComponent>;
  let resumoSimulacaoMock: RespostaSimulacaoDTO;
  let parcelasMock: ParcelaSimulacaoDTO[];

  beforeEach(async () => {
    registerLocaleData(localePt);
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
        SimulacaoContextService,
        ToastService,
        provideToastr(),
        { provide: LOCALE_ID, useValue: 'pt-BR' },
      ],
    }).compileComponents();

    parcelasMock = [
      {
        numero: 1,
        saldo_devedor: 10,
        valor_amortizacao: 10,
        valor_juros: 10,
        valor_prestacao: 10,
      },
    ];

    resumoSimulacaoMock = {
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

    fixture = TestBed.createComponent(DetalhamentoParcelasComponent);
    component = fixture.componentInstance;
    component.resumoSimulacao = resumoSimulacaoMock;
    component.parcelas = parcelasMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
