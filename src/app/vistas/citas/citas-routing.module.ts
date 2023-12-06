import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './citas.component';
import { ListaCitasComponent } from './lista-citas/lista-citas.component';
import { DetalleCitaComponent } from './detalle-cita/detalle-cita.component';

const routes: Routes = [
  { 
    path: '', component: CitasComponent, children: [
      { path: "listado", component: ListaCitasComponent},
      { path: "detalle/:id", component: DetalleCitaComponent},
      { path: "agregar", component: DetalleCitaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }
