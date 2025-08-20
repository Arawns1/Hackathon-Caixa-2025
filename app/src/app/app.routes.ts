import { Routes } from '@angular/router';
import { ListaProdutosComponent } from './pages/lista-produtos/lista-produtos.component';
import { SimulacaoComponent } from './pages/simulacao/simulacao.component';
import { ResumoSimulacaoComponent } from './pages/resumo-simulacao/resumo-simulacao.component';
import { DetalhamentoParcelasComponent } from './pages/detalhamento-parcelas/detalhamento-parcelas.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { TelaInicialComponent } from './pages/tela-inicial/tela-inicial.component';

export const routes: Routes = [
  {
    path: '',
    component: TelaInicialComponent,
    data: { showHeader: false },
  },
  {
    path: 'produtos',
    children: [
      { path: '',
        loadComponent: () => import('./pages/lista-produtos/lista-produtos.component').then(m => m.ListaProdutosComponent),
         data: { title: 'Lista de Produtos' } },
      {
        path: 'cadastro',
        loadComponent: () => import('./pages/cadastro-produto/cadastro-produto.component').then(m => m.CadastroProdutoComponent),
        data: { title: 'Novo Produto' },
      },
    ],
  },
  {
    path: 'simulacao',
    children: [
      { path: '', loadComponent: () => import('./pages/simulacao/simulacao.component').then(m => m.SimulacaoComponent), data: { title: 'Simulação' } },
      {
        path: 'resumo',
        loadComponent: () => import('./pages/resumo-simulacao/resumo-simulacao.component').then(m => m.ResumoSimulacaoComponent),
        data: { title: 'Resumo da Simulação' },
      },
      {
        path: 'detalhamento-parcelas',
        loadComponent: () => import('./pages/detalhamento-parcelas/detalhamento-parcelas.component').then(m => m.DetalhamentoParcelasComponent),
        data: { title: 'Dados das Parcelas' },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
