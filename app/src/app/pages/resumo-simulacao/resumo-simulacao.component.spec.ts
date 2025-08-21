import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '../../components/button/button.component';
import { DividerComponent } from '../../components/divider/divider.component';
import { LoadingSimulacaoComponent } from '../../components/loading-simulacao/loading-simulacao.component';
import { SucessoSimulacaoComponent } from '../../components/sucesso-simulacao/sucesso-simulacao.component';
import { SimulacaoService } from '../../services/api/simulacao/simulacao.service';
import { SimulacaoContextService } from '../../services/context/simulacao/simulacao-context.service';
import { ToastService } from '../../services/libs/toast/toast.service';

import { ResumoSimulacaoComponent } from './resumo-simulacao.component';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

describe('ResumoSimulacaoComponent', () => {
  let component: ResumoSimulacaoComponent;
  let fixture: ComponentFixture<ResumoSimulacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResumoSimulacaoComponent,
        CommonModule,
        MatIconModule,
        ButtonComponent,
        RouterModule,
        DividerComponent,
        CurrencyPipe,
        LoadingSimulacaoComponent,
        SucessoSimulacaoComponent,
      ],
      providers: [
        provideRouter([]),
        provideAnimations(),
        provideHttpClient(),
        provideToastr(),
        SimulacaoService,
        SimulacaoContextService,
        ToastService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumoSimulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
