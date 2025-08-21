import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from '../button/button.component';
import { PercentPipe } from '@angular/common';

import { CardProdutoComponent } from './card-produto.component';
import { ProdutoDTO } from '../../models/Produto';

describe('CardProdutoComponent', () => {
  let component: CardProdutoComponent;
  let fixture: ComponentFixture<CardProdutoComponent>;
  let produtoMock: ProdutoDTO;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProdutoComponent, ButtonComponent, PercentPipe],
    }).compileComponents();

    produtoMock = {
      id: 1,
      nome: 'PRODUTO MOCK',
      prazo_maximo: 10,
      taxa_anual: 10,
    };

    fixture = TestBed.createComponent(CardProdutoComponent);
    component = fixture.componentInstance;
    component.produto = produtoMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
