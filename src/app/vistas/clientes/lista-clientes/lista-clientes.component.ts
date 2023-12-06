import { Component } from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent {
  
  clientes?: Cliente[];

  constructor(private dbs: DatabaseService) { }

  ngOnInit() {
    this.getClientes();
  }

  // Método que obtiene los clientes y los guarda en el array clientes
  getClientes() {
    this.dbs.getCollection("clientes")
      .subscribe(res => this.clientes = res);
  }

  // Método que recibe un id de cliente y lo elimina de la base de datos
  deleteCliente(id: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger me-3"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "¡No se podrán revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dbs.deleteDocument(id, "clientes")
          .then(() => swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "El cliente ha sido eliminado",
            icon: "success"
          }))
          .catch(() => swalWithBootstrapButtons.fire({
            title: "Oops...!",
            text: "El cliente no ha sido eliminado",
            icon: "error"
          }));
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El cliente no ha sido eliminado",
          icon: "error"
        });
      }
    });
  }
}
