import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { PlanEntrega } from '../_models/plan-entrega';

@Injectable({
  providedIn: 'root'
})
export class PlanEntregaService {
  baseUrl = environment.apiUrl;
  planEntrega: PlanEntrega[] = [];

  constructor(private http: HttpClient) { }

  obtenerPlanEntregas() {
    return this.http.get<PlanEntrega[]>(this.baseUrl + 'PlanEntrega').pipe(
      map(planEntregas => {
        this.planEntrega = planEntregas;
        console.log('PlanEntregas', planEntregas);
        return planEntregas;
      })
    )
  }

  insertarPlanEntrega(model: any) {
    return this.http.post<number>(this.baseUrl + 'PlanEntrega', model).pipe(
      map((response) => {
        return response;
      }
      ));
  }

  editarPlanEntrega(model: any) {
    return this.http.put<number>(this.baseUrl + 'PlanEntrega', model).pipe(
      map((response) => {
        return response;
      }
      ));

  }

  eliminarPlanEntrega(idPlanEntrega: number) {
    return this.http.delete(this.baseUrl + 'PlanEntrega/' + idPlanEntrega)
  }

}
