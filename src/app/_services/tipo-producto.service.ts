import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoProducto } from '../_models/tipo-producto';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  baseUrl = environment.apiUrl;
  tipoProducto: TipoProducto[] = [];

  constructor(private http: HttpClient) { }

  obtenerTipoProductos() {
    return this.http.get<TipoProducto[]>(this.baseUrl + 'TipoProducto').pipe(
      map(tipoProductos => {
        this.tipoProducto = tipoProductos;
        console.log('tipoProductos', tipoProductos);
        return tipoProductos;
      })
    )
  }

  insertarTipoProducto(model: any) {
    return this.http.post<number>(this.baseUrl + 'TipoProducto', model).pipe(
      map((response) => {
        return response;
      }
      ));
  }

  editarTipoProducto(model: any) {
    return this.http.put<number>(this.baseUrl + 'TipoProducto', model).pipe(
      map((response) => {
        return response;
      }
      ));

  }

  eliminarTipoProducto(idTipoProducto: number) {
    return this.http.delete(this.baseUrl + 'TipoProducto/' + idTipoProducto)
  }

}
