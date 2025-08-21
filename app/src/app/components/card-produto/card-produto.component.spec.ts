import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from '../button/button.component';
import { PercentPipe } from '@angular/common';
import { By } from '@angular/platform-browser';

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
      taxa_anual: 0.1,
    };

    fixture = TestBed.createComponent(CardProdutoComponent);
    component = fixture.componentInstance;
    component.produto = produtoMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir corretamente os dados do produto', () => {
    const nomeEl = fixture.debugElement.query(
      By.css('[data-test-id="produto-nome"]'),
    ).nativeElement;
    const taxaEl = fixture.debugElement.query(
      By.css('[data-test-id="produto-taxa"]'),
    ).nativeElement;
    const prazoEl = fixture.debugElement.query(
      By.css('[data-test-id="produto-prazo"]'),
    ).nativeElement;

    expect(nomeEl.textContent).toContain(produtoMock.nome);
    expect(taxaEl.textContent).toContain('10.00% ao ano');
    expect(prazoEl.textContent).toContain(`${produtoMock.prazo_maximo}x`);
  });

  it('deve emitir evento ao clicar no card', () => {
    spyOn(component.produtoSelecionado, 'emit');

    const cardEl = fixture.debugElement.query(By.css('[data-test-id="card-produto"]'));
    cardEl.triggerEventHandler('click', null);

    expect(component.produtoSelecionado.emit).toHaveBeenCalledWith(produtoMock);
  });
});
