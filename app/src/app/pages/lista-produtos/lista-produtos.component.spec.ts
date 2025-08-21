import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { CardProdutoComponent } from '../../components/card-produto/card-produto.component';
import { ProdutosService } from '../../services/api/produtos/produtos.service';
import { ProdutosContextService } from '../../services/context/produtos/produtos-context.service';

import { ListaProdutosComponent } from './lista-produtos.component';
import { provideHttpClient } from '@angular/common/http';

describe('ListaProdutosComponent', () => {
  let component: ListaProdutosComponent;
  let fixture: ComponentFixture<ListaProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProdutosComponent, CommonModule, CardProdutoComponent],
      providers: [provideRouter([]), provideHttpClient(), ProdutosService, ProdutosContextService],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
