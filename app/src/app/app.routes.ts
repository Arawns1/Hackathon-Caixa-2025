import { Routes } from '@angular/router';
import { ListaProdutosComponent } from './pages/lista-produtos/lista-produtos.component';
import { SimulacaoComponent } from './pages/simulacao/simulacao.component';
import { ResumoSimulacaoComponent } from './pages/resumo-simulacao/resumo-simulacao.component';
import { DetalhamentoParcelasComponent } from './pages/detalhamento-parcelas/detalhamento-parcelas.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';

export const routes: Routes = [
  {
    path: 'produtos',
    children: [
      { path: '', component: ListaProdutosComponent },
      { path: 'cadastro', component: CadastroProdutoComponent },
    ],
  },
  {
    path: 'simulacao',
    children: [
      { path: '', component: SimulacaoComponent },
      { path: 'resumo', component: ResumoSimulacaoComponent },
      { path: 'detalhamento-parcelas', component: DetalhamentoParcelasComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'produtos',
  },
];
