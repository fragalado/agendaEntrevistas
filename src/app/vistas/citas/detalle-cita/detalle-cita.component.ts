import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatosCita } from 'src/app/modelos/cita';
import { Cliente } from 'src/app/modelos/cliente';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent {

  selectedCliente?: Cliente;
  id?: string;
  datosCita: DatosCita = { diaCita: "", horaCita: "", entrevistadoPor: "", idCliente: "", visto: false };
  todosClientes?: Cliente[];

  // Variables para la fecha
  hoy = new Date();
  anyo = this.hoy.getFullYear();
  mes = this.hoy.getMonth() + 1;
  dia = this.hoy.getDate();
  fecha = this.dia + "" + this.mes + "" + this.anyo;

  constructor(private dbs: DatabaseService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Obtenemos el id de la cita
    this.id = this.route.snapshot.paramMap.get("id")!;

    // Obtenemos la cita
    this.obtieneCita();

    // Obtenemos todos los clientes
    this.obtieneTodosClientes();
  }

  // Método que obtiene la cita de la base de datos según el id
  obtieneCita() {
    // Con el id buscamos la cita
    this.dbs.getDocumentById(this.id!, "agenda/" + this.fecha + "/citas").subscribe(res => this.datosCita = res);
  }

  // Método que obtiene todos los clientes de la base de datos
  obtieneTodosClientes() {
    this.dbs.getCollection("clientes").subscribe((res) => {
      this.todosClientes = res;

      // Ahora buscamos el cliente que tiene la cita
      this.selectedCliente = this.todosClientes.find(element => element.id === this.datosCita.idCliente);

      // Verificamos si se encontró el cliente
      if (this.selectedCliente != undefined) {
        // Filtramos la lista para excluir el cliente encontrado
        this.todosClientes = this.todosClientes.filter(element => element.id !== this.selectedCliente?.id);
      }
    });
  }

  // Método que actualiza la cita en la base de datos
  enviar() {
    // Enviamos la cita actualizada
    this.dbs.updateDocument(this.datosCita, "agenda/" + this.fecha + "/citas")
      .then(() => console.log("Cita actualizada"))
      .catch((error) => console.log("Cita no actualizada: " + error));
  }
}
