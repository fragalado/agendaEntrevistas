import { Component } from '@angular/core';
import { Cita, DatosCita } from 'src/app/modelos/cita';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent {

  datosCitas?: DatosCita[];
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
    // Limpiamos el array citas
    this.citas = [];

    // Construye la fecha en formato "ddmmaaaa"
    const fecha = `${this.dia}${this.mes}${this.anyo}`;

    // Obtiene las citas del día de la base de datos
    this.dbs.getCollection(`agenda/${fecha}/citas`).subscribe((res) => {
      // Verifica si no hay citas y llama a la función para agregarlas
      if (res.length === 0) {
        this.addCitas(); // No hay citas, se agregan llamando a la función addCitas
      } else {
        // Procesa cada cita
        this.datosCitas = res;

        // Itera sobre cada cita obtenida
        this.datosCitas.forEach((cita) => {
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
            // Si la cita tiene un cliente asociado, obtén la información del cliente
            this.dbs.getDocumentById(cita.idCliente, "clientes").subscribe((cliente) => {
              // Crea una nueva cita con los datos completos, incluyendo el cliente
              const citaCambio: Cita = {
                id: cita.id,
                diaCita: cita.diaCita,
                entrevistadoPor: cita.entrevistadoPor,
                horaCita: cita.horaCita,
                visto: cita.visto,
                cliente: cliente,
              };
              // Agrega la nueva cita al array de citas
              this.citas.push(citaCambio);
            });
          }
        });
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
