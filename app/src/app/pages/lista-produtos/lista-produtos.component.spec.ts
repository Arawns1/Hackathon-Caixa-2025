import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { asyncScheduler, observeOn, of } from 'rxjs';
import { CardProdutoComponent } from '../../components/card-produto/card-produto.component';
import { ProdutosService } from '../../services/api/produtos/produtos.service';
import { ProdutosContextService } from '../../services/context/produtos/produtos-context.service';
import { ListaProdutosComponent } from './lista-produtos.component';
import { provideHttpClient } from '@angular/common/http';

describe('ListaProdutosComponent', () => {
  let component: ListaProdutosComponent;
  let fixture: ComponentFixture<ListaProdutosComponent>;
  let produtosService: ProdutosService;
  let produtoContext: ProdutosContextService;

  const mockProdutos = [
    { id: 1, nome: 'Produto A', prazo_maximo: 5, taxa_anual: 0.1 },
    { id: 2, nome: 'Produto B', prazo_maximo: 10, taxa_anual: 0.2 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProdutosComponent, CommonModule, CardProdutoComponent],
      providers: [provideRouter([]), provideHttpClient(), ProdutosService, ProdutosContextService],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaProdutosComponent);
    component = fixture.componentInstance;
    produtosService = TestBed.inject(ProdutosService);
    produtoContext = TestBed.inject(ProdutosContextService);

    spyOn(produtosService, 'obter').and.returnValue(
      of(mockProdutos).pipe(observeOn(asyncScheduler)),
    );
    spyOn(produtoContext, 'setProdutoSelecionado');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve definir isLoading como true inicialmente e carregar produtos', fakeAsync(() => {
    component.ngOnInit();
    expect(component.isLoading).toBeTrue();
    tick();
    expect(component.produtos).toEqual(mockProdutos);
    expect(component.isLoading).toBeFalse();
  }));

  it('deve exibir o loading enquanto carrega produtos', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const loadingEl = fixture.nativeElement.querySelector('[data-test-id="loading"]');
    expect(loadingEl).toBeTruthy();
  });

  it('deve exibir a lista de produtos quando carregados', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.isLoading).toBeFalse();
    const listaEl = fixture.nativeElement.querySelector('[data-test-id="produtos-lista"]');
    expect(listaEl).toBeTruthy();

    const items = listaEl.querySelectorAll('[data-test-id="produto-item"]');
    expect(items.length).toBe(2);
  }));

  it('deve chamar setProdutoSelecionado e navegar ao selecionar produto', () => {
    const produtoSelecionado = mockProdutos[0];
    spyOn(component['router'], 'navigate');

    component.handleProdutoSelecionado(produtoSelecionado);

    expect(produtoContext.setProdutoSelecionado).toHaveBeenCalledWith(produtoSelecionado);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/simulacao']);
  });
});
