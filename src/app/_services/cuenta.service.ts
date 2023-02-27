import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  baseUrl = environment.apiUrl;
  private usuarioActualFuente = new ReplaySubject<string>(1);
  usuarioActual$ = this.usuarioActualFuente.asObservable();

  constructor(private http: HttpClient) { }

  login() {
    return this.http.get(this.baseUrl + 'Cuenta/Login').pipe(
       map((response) => {
        const token = response as string;
        console.log('token', response);
        if (token != '') {
          this.inicializarUsuarioActual(token);
        }
      })
    
      
    );
  }

  inicializarUsuarioActual(token: string) {
    //localStorage.setItem('user', JSON.stringify(user));
    this.usuarioActualFuente.next(token);
  }

  logout() {
    this.usuarioActualFuente.next(null!);
  }
}
