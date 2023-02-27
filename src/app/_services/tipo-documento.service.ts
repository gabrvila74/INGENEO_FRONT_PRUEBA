import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoDocumento } from '../_models/tipo-documento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  baseUrl = environment.apiUrl;
  tipoDocumento: TipoDocumento[] = [];

  constructor(private http: HttpClient) { }

  obtenerTipoDocumentos() {
    return this.http.get<TipoDocumento[]>(this.baseUrl + 'TipoDocumento').pipe(
      map(tipoDocumentos => {
        console.log('tipoDocumentos', tipoDocumentos);
        this.tipoDocumento = tipoDocumentos;
        return tipoDocumentos;
      })
    )
  }

}
