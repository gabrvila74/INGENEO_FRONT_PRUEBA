import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cliente } from '../_models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl = environment.apiUrl;
  cliente: Cliente[] = [];

  constructor(private http: HttpClient) { }

  obtenerClientes() {
    return this.http.get<Cliente[]>(this.baseUrl + 'Cliente').pipe(
      map(clientes => {
        this.cliente = clientes;
        console.log('clientes', clientes);
        return clientes;
      })
    )
  }

  insertarCliente(model: any) {
    return this.http.post<number>(this.baseUrl + 'Cliente', model).pipe(
      map((response) => {
        return response;
      }
      ));
  }

  editarCliente(model: any) {
    return this.http.put<number>(this.baseUrl + 'Cliente', model).pipe(
      map((response) => {
        return response;
      }
      ));

  }

  eliminarCliente(idCliente: number) {
    return this.http.delete(this.baseUrl + 'Cliente/' + idCliente)
  }

}
