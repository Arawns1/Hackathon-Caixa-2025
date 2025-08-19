import { Routes } from '@angular/router';
import { ListaProdutosComponent } from './pages/lista-produtos/lista-produtos.component';
import { SimulacaoComponent } from './pages/simulacao/simulacao.component';

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
    path: '**',
    redirectTo: '',
  },
];
