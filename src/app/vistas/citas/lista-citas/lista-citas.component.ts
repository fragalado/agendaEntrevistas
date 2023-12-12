import { Component } from '@angular/core';
import { Cita, DatosCita } from 'src/app/modelos/cita';
import { Cliente } from 'src/app/modelos/cliente';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent {

  datosCitas?: DatosCita[];
  clientes?: Cliente[];
  citas: Cita[] = [];

  // Variables para la fecha
  hoy = new Date();
  anyo = this.hoy.getFullYear();
  mes = this.hoy.getMonth() + 1;
  dia = this.hoy.getDate();

  constructor(private dbs: DatabaseService) { }

  ngOnInit() {
    this.obtenerCitasDia();
  }

  // Método que obtiene las citas del día desde la base de datos.
  // Si no existe ninguna cita las crea.
  obtenerCitasDia() {
    // Construye la fecha en formato "ddmmaaaa"
    const fecha = `${this.dia}${this.mes}${this.anyo}`;

    // Obtiene las citas del día de la base de datos
    this.dbs.getCollection(`agenda/${fecha}/citas`).subscribe((res) => {
      if (res.length === 0) {
        // Si no hay citas para el día, llamamos a la función para agregar citas
        this.addCitas();
      } else {
        // Almacenamos las citas obtenidas en la variable datosCitas
        this.datosCitas = res;

        // Obtenemos la colección de clientes
        this.dbs.getCollection("clientes").subscribe((aux) => {
          // Limpiamos el array citas
          this.citas = [];

           // Almacenamos la lista de clientes en la variable clientes
          this.clientes = aux;

          // Recorremos las citas
          this.datosCitas?.forEach((cita) => {
            if (!cita.idCliente) {
              // Si la cita no tiene un cliente asociado,
              // Crea una nueva cita sin el cliente
              const citaCambio: Cita = {
                diaCita: cita.diaCita,
                entrevistadoPor: cita.entrevistadoPor,
                horaCita: cita.horaCita,
                visto: cita.visto,
                id: cita.id
              };
              // Agrega la nueva cita al array de citas
              this.citas.push(citaCambio);
            } else {
              // Si tiene cliente
              // Buscaremos el cliente por el id en la lista cliente
              this.clientes?.forEach((cliente) => {
                if (cita.idCliente === cliente.id) {
                  // Creamos una nueva cita con el cliente asociado
                  const citaCambio: Cita = {
                    id: cita.id,
                    diaCita: cita.diaCita,
                    entrevistadoPor: cita.entrevistadoPor,
                    horaCita: cita.horaCita,
                    visto: cita.visto,
                    cliente: cliente,
                  };
                  // Agregamos la nueva cita al array de citas
                  this.citas.push(citaCambio);
                }
              })
            }
          })
        })
      }
    });
  }

  // Este método se ejecutará si no hay citas en un dia
  // Añadirá 16 citas a la base de datos
  addCitas() {
    // Creamos un nuevo documento en agenda
    const fecha = this.dia + "/" + this.mes + "/" + this.anyo;
    const fechaSinBarras = this.dia + "" + this.mes + "" + this.anyo;
    const horas = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"];
    const citas: Cita[] = [];

    // Hacemos un bucle para añadir citas
    for (let index = 0; index < horas.length; index++) {
      // Añadimos citas de entrevistador A
      citas.push({
        visto: false,
        diaCita: fecha,
        entrevistadoPor: "A",
        horaCita: horas[index]
      });

      // Añadimos citas de entrevistador B
      citas.push({
        visto: false,
        diaCita: fecha,
        entrevistadoPor: "B",
        horaCita: horas[index]
      });
    }

    // Recorremos el array de citas y creamos un documento
    for (let index = 0; index < citas.length; index++) {
      this.dbs.newDocument(citas[index], "agenda/" + fechaSinBarras + "/citas");
    }
  }
}
