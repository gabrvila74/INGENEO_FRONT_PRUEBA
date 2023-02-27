import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoDocumento } from '../_models/tipo-documento';
import { TipoPuntoEntrega } from '../_models/tipo-punto-entrega';

@Injectable({
  providedIn: 'root'
})
export class TipoPuntoEntregaService {
  baseUrl = environment.apiUrl;
  tipoPuntoEntrega: TipoPuntoEntrega[] = [];

  constructor(private http: HttpClient) { }

  obtenerTipoPuntoEntregas() {
    return this.http.get<TipoPuntoEntrega[]>(this.baseUrl + 'TipoPuntoEntrega').pipe(
      map(tipoPuntoEntregas => {
        console.log('tipoPuntoEntrega', tipoPuntoEntregas);
        this.tipoPuntoEntrega = tipoPuntoEntregas;
        return tipoPuntoEntregas;
      })
    )
  }
}
