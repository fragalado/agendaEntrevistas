import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './vistas/core/bienvenida/bienvenida.component';

const routes: Routes = [
  { path: "", component: BienvenidaComponent},
  { path: 'citas', loadChildren: () => import('./vistas/citas/citas.module').then(m => m.CitasModule) }, 
  { path: 'clientes', loadChildren: () => import('./vistas/clientes/clientes.module').then(m => m.ClientesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
