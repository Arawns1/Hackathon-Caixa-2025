import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { RespostaSimulacaoDTO, SimularEmprestimoDTO } from '../../../models/Simulacao';

@Injectable({
  providedIn: 'root',
})
export class SimulacaoService {
  private readonly endpoint = `${environment.baseURL}/simulacoes`;

  constructor(private readonly http: HttpClient) {}

  public simular(novaSimulacao: SimularEmprestimoDTO): Observable<RespostaSimulacaoDTO> {
    return this.http.post<RespostaSimulacaoDTO>(this.endpoint, novaSimulacao).pipe(delay(3500));
  }
}
