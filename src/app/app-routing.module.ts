import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { PlanEntregaComponent } from './plan-entrega/plan-entrega.component';
import { PuntoEntregaComponent } from './punto-entrega/punto-entrega.component';
import { TipoProductoComponent } from './tipo-producto/tipo-producto.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    children: [
      { path: '', component: HomeComponent },
      { path: 'tipo-producto', component: TipoProductoComponent },
      { path: 'cliente', component: ClienteComponent },
      { path: 'punto-entrega', component: PuntoEntregaComponent },
      { path: 'plan-entrega', component: PlanEntregaComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
