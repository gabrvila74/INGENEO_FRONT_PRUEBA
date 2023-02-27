import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoLogistica } from '../_models/tipo-logistica';

@Injectable({
  providedIn: 'root'
})
export class TipoLogisticaService {
  baseUrl = environment.apiUrl;
  tipoLogistica: TipoLogistica[] = [];

  constructor(private http: HttpClient) { }

  obtenerTipoLogisticas() {
    return this.http.get<TipoLogistica[]>(this.baseUrl + 'TipoLogistica').pipe(
      map(tipoLogisticas => {
        console.log('tipoLogistica', tipoLogisticas);
        this.tipoLogistica = tipoLogisticas;
        return tipoLogisticas;
      })
    )
  }
}
