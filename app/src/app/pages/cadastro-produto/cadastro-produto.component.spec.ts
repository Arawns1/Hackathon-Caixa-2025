import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { ProdutosService } from '../../services/api/produtos/produtos.service';
import { ToastService } from '../../services/libs/toast/toast.service';

import { CadastroProdutoComponent } from './cadastro-produto.component';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

describe('CadastroProdutoComponent', () => {
  let component: CadastroProdutoComponent;
  let fixture: ComponentFixture<CadastroProdutoComponent>;

  beforeEach(async () => {
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
        ProdutosService,
        ToastService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
