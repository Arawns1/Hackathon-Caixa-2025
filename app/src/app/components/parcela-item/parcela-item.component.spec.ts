import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DividerComponent } from '../divider/divider.component';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ParcelaItemComponent } from './parcela-item.component';
import { ParcelaSimulacaoDTO } from '../../models/Parcela';
import { LOCALE_ID } from '@angular/core';

describe('ParcelaItemComponent', () => {
  let component: ParcelaItemComponent;
  let fixture: ComponentFixture<ParcelaItemComponent>;
  let parcelaMock: ParcelaSimulacaoDTO;

  beforeEach(async () => {
    registerLocaleData(localePt);

    await TestBed.configureTestingModule({
      imports: [ParcelaItemComponent, CommonModule, DividerComponent, CurrencyPipe, MatIconModule],
      providers: [provideAnimations(), { provide: LOCALE_ID, useValue: 'pt-BR' }],
    }).compileComponents();

    parcelaMock = {
      numero: 1,
      saldo_devedor: 1000,
      valor_amortizacao: 1000,
      valor_juros: 1000,
      valor_prestacao: 1000,
    };

    fixture = TestBed.createComponent(ParcelaItemComponent);
    component = fixture.componentInstance;
    component.parcela = parcelaMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
