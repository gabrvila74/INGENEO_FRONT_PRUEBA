import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { PuntoEntrega } from '../_models/punto-entrega';
import { TipoProducto } from '../_models/tipo-producto';

@Injectable({
  providedIn: 'root'
})
export class PuntoEntregaService {
  baseUrl = environment.apiUrl;
  puntoEntrega: PuntoEntrega[] = [];

  constructor(private http: HttpClient) { }

  obtenerPuntoEntregas() {
    return this.http.get<PuntoEntrega[]>(this.baseUrl + 'PuntoEntrega').pipe(
      map(puntoEntregas => {
        this.puntoEntrega = puntoEntregas;
        console.log('puntoEntregas', puntoEntregas);
        return puntoEntregas;
      })
    )
  }

  insertarPuntoEntrega(model: any) {
    return this.http.post<number>(this.baseUrl + 'PuntoEntrega', model).pipe(
      map((response) => {
        return response;
      }
      ));
  }

  editarPuntoEntrega(model: any) {
    return this.http.put<number>(this.baseUrl + 'PuntoEntrega', model).pipe(
      map((response) => {
        return response;
      }
      ));

  }

  eliminarPuntoEntrega(idPuntoEntrega: number) {
    return this.http.delete(this.baseUrl + 'PuntoEntrega/' + idPuntoEntrega)
  }

}
