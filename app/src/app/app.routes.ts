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
      { path: '', component: ListaProdutosComponent, data: { title: 'Lista de Produtos' } },
      {
        path: 'cadastro',
        component: CadastroProdutoComponent,
        data: { title: 'Novo Produto' },
      },
    ],
  },
  {
    path: 'simulacao',
    children: [
      { path: '', component: SimulacaoComponent, data: { title: 'Simulação' } },
      {
        path: 'resumo',
        component: ResumoSimulacaoComponent,
        data: { title: 'Resumo da Simulação' },
      },
      {
        path: 'detalhamento-parcelas',
        component: DetalhamentoParcelasComponent,
        data: { title: 'Dados das Parcelas' },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
