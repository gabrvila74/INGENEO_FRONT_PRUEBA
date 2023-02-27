import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { CuentaService } from '../_services/cuenta.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: CuentaService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token: string = "";
    this.accountService.usuarioActual$.pipe(take(1)).subscribe(usuario => token = usuario);
    if (token != "") {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }

      })
    }
    return next.handle(request);
  }

}
