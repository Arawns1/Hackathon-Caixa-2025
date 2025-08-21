import { ComponentFixture, TestBed } from '@angular/core/testing';
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

import { SimulacaoComponent } from './simulacao.component';
import { provideToastr } from 'ngx-toastr';

describe('SimulacaoComponent', () => {
  let component: SimulacaoComponent;
  let fixture: ComponentFixture<SimulacaoComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
