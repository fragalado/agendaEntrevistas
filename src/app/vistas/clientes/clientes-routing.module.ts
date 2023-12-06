import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';

const routes: Routes = [
  { 
    path: '', component: ClientesComponent, children: [
      { path: "listado", component: ListaClientesComponent},
      { path: "detalle/:id", component: DetalleClienteComponent},
      { path: "agregar", component: DetalleClienteComponent}
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
