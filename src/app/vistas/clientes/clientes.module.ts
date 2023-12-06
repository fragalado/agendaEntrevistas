import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ClientesComponent,
    ListaClientesComponent,
    DetalleClienteComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //NgbModule
  ]
})
export class ClientesModule { }
