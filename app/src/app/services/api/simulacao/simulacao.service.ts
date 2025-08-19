import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RespostaSimulacaoDTO, SimularEmprestimoDTO } from '../../../models/Simulacao';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SimulacaoService {
  private readonly endpoint = `${environment.baseURL}/simulacoes`;

  constructor(private http: HttpClient) {}

  public simular(novaSimulacao: SimularEmprestimoDTO): Observable<RespostaSimulacaoDTO> {
    return of(null).pipe(
      delay(3000),
      switchMap(() => this.http.post<RespostaSimulacaoDTO>(this.endpoint, novaSimulacao)),
    );
  }
}
