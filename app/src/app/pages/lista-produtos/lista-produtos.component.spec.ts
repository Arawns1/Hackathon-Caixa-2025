import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { asyncScheduler, observeOn, of, throwError } from 'rxjs';
import { CardProdutoComponent } from '../../components/card-produto/card-produto.component';
import { ProdutosService } from '../../services/api/produtos/produtos.service';
import { ProdutosContextService } from '../../services/context/produtos/produtos-context.service';
import { ToastService } from '../../services/libs/toast/toast.service';
import { ListaProdutosComponent } from './lista-produtos.component';
import { InputBuscaProdutosComponent } from '../../components/input-busca-produtos/input-busca-produtos.component';

describe('ListaProdutosComponent', () => {
  let component: ListaProdutosComponent;
  let fixture: ComponentFixture<ListaProdutosComponent>;
  let produtoContext: ProdutosContextService;
  let produtosService: jasmine.SpyObj<ProdutosService>;
  const mockProdutos = [
    { id: 1, nome: 'Produto A', prazo_maximo: 5, taxa_anual: 0.1 },
    { id: 2, nome: 'Produto B', prazo_maximo: 10, taxa_anual: 0.2 },
  ];
  let toast: jasmine.SpyObj<ToastService>;
  let router: Router;

  beforeEach(async () => {
    produtosService = jasmine.createSpyObj('ProdutosService', ['obter']);
    produtosService.obter.and.returnValue(of(mockProdutos).pipe(observeOn(asyncScheduler)));
    toast = jasmine.createSpyObj('ToastService', ['erro']);
    await TestBed.configureTestingModule({
      imports: [
        ListaProdutosComponent,
        CommonModule,
        CardProdutoComponent,
        InputBuscaProdutosComponent,
      ],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        ProdutosContextService,
        { provide: ProdutosService, useValue: produtosService },
        { provide: ToastService, useValue: toast },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ListaProdutosComponent);
    component = fixture.componentInstance;
    produtoContext = TestBed.inject(ProdutosContextService);

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

  it('deve exibir toast de erro e redirecionar ao falhar ao carregar produtos', fakeAsync(() => {
    spyOn(router, 'navigate');

    produtosService.obter.and.returnValue(
      throwError(() => new Error('Erro')).pipe(observeOn(asyncScheduler)),
    );

    component.ngOnInit();
    tick();

    expect(toast.erro).toHaveBeenCalledWith('Erro ao listar produtos. Tente novamente mais tarde');
    expect(component.isLoading).toBeFalse();
    expect(component.produtos.length).toBe(0);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('deve atualizar produtosExibidos ao chamar onProdutosFiltrados', () => {
    const filtradosMock = [mockProdutos[1]];
    component.onProdutosFiltrados(filtradosMock);
    expect(component.produtosExibidos).toEqual(filtradosMock);
  });

  it('deve aceitar lista vazia em onProdutosFiltrados', () => {
    component.onProdutosFiltrados([]);
    expect(component.produtosExibidos).toEqual([]);
  });
});
