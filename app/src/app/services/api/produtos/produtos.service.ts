import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ProdutoDTO, SalvarProdutoDTO } from '../../../models/Produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private readonly endpoint = `${environment.baseURL}/produtos`;

  constructor(private http: HttpClient) {}

  public obter(): Observable<ProdutoDTO[]> {
    return this.http.get<ProdutoDTO[]>(this.endpoint);
  }

  public salvar(novoProduto: SalvarProdutoDTO): Observable<any> {
    return this.http.post(this.endpoint, novoProduto);
  }
}
