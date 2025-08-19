import { Routes } from '@angular/router';
import { ListaProdutosComponent } from './pages/lista-produtos/lista-produtos.component';
import { SimulacaoComponent } from './pages/simulacao/simulacao.component';
import { ResumoSimulacaoComponent } from './pages/resumo-simulacao/resumo-simulacao.component';
import { DetalhamentoParcelasComponent } from './pages/detalhamento-parcelas/detalhamento-parcelas.component';

export const routes: Routes = [
  {
    path: '',
    component: ListaProdutosComponent,
  },
  {
    path: 'simulacao',
    component: SimulacaoComponent,
  },
  {
    path: 'resumo-simulacao',
    component: ResumoSimulacaoComponent,
  },
  {
    path: 'detalhamento-parcelas',
    component: DetalhamentoParcelasComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
