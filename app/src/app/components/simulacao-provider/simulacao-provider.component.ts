import { Component } from '@angular/core';
import { SimulacaoContextService } from '../../services/context/simulacao/simulacao-context.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-simulacao-provider',
  imports: [RouterOutlet],
  providers: [SimulacaoContextService],
  templateUrl: './simulacao-provider.component.html',
  styleUrl: './simulacao-provider.component.css',
})
export class SimulacaoProviderComponent {}
