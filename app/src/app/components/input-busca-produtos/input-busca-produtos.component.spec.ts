import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { ProdutoDTO } from '../../models/Produto';
import { BuscarProdutosService } from '../../services/integration/busca/buscar-produtos.service';
import { InputBuscaProdutosComponent } from './input-busca-produtos.component';

describe('InputBuscaProdutosComponent', () => {
  let component: InputBuscaProdutosComponent;
  let fixture: ComponentFixture<InputBuscaProdutosComponent>;
  let buscaServiceSpy: jasmine.SpyObj<BuscarProdutosService>;

  const produtosMock: ProdutoDTO[] = [
    { id: 1, nome: 'Produto A', taxa_anual: 5, prazo_maximo: 12 },
    { id: 2, nome: 'Produto B', taxa_anual: 10, prazo_maximo: 24 },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BuscarProdutosService', ['buscarFuzzy']);

    await TestBed.configureTestingModule({
      imports: [InputBuscaProdutosComponent, FormsModule, MatIconModule],
      providers: [{ provide: BuscarProdutosService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(InputBuscaProdutosComponent);
    component = fixture.componentInstance;
    component.produtos = produtosMock;
    buscaServiceSpy = TestBed.inject(
      BuscarProdutosService,
    ) as jasmine.SpyObj<BuscarProdutosService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o botão de reset somente se houver termo de busca', () => {
    component.termoBusca = '';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-test-id="botao-reset"]'))).toBeNull();

    component.termoBusca = 'Produto';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-test-id="botao-reset"]'))).not.toBeNull();
  });

  it('deve emitir produtos filtrados após mudança no input', fakeAsync(() => {
    const produtosFiltradosMock = [produtosMock[0]];
    buscaServiceSpy.buscarFuzzy.and.returnValue(produtosFiltradosMock);

    spyOn(component.produtosFiltrados, 'emit');
    const input = fixture.debugElement.query(By.css('[data-test-id="input-busca"]')).nativeElement;
    input.value = 'Produto A';
    input.dispatchEvent(new Event('input'));
    tick(300);

    expect(buscaServiceSpy.buscarFuzzy).toHaveBeenCalledWith(produtosMock, 'Produto A');
    expect(component.produtosFiltrados.emit).toHaveBeenCalledWith(produtosFiltradosMock);
  }));

  it('não deve emitir se o termo de busca não mudar', fakeAsync(() => {
    const produtosFiltradosMock = [produtosMock[0]];
    buscaServiceSpy.buscarFuzzy.and.returnValue(produtosFiltradosMock);

    spyOn(component.produtosFiltrados, 'emit');
    component.onBuscaChange('Produto A');
    tick(300);
    component.onBuscaChange('Produto A');
    tick(300);

    expect(component.produtosFiltrados.emit).toHaveBeenCalledTimes(1);
  }));

  it('deve limpar o termo de busca quando o botão de limpar for clicado', () => {
    component.termoBusca = 'Produto A';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('[data-test-id="botao-reset"]'));
    button.nativeElement.click();
    fixture.detectChanges();

    expect(component.termoBusca).toBe('');
  });

  it('input deve ter maxlength definido corretamente', () => {
    const input = fixture.debugElement.query(By.css('[data-test-id="input-busca"]'));
    expect(input.attributes['maxlength']).toBe('60');
  });

  it('input deve ter placeholder e aria-label corretos', () => {
    const input = fixture.debugElement.query(By.css('[data-test-id="input-busca"]'));
    expect(input.attributes['placeholder']).toBe('Busque por um produto, taxa ou prazo máximo');
    expect(input.attributes['aria-label']).toBe('Campo de busca de produtos, taxa ou prazo máximo');
  });
});
