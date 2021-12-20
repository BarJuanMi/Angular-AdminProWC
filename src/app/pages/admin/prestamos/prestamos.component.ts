import { Component, OnInit } from '@angular/core';
import { Prestamo } from 'src/app/models/prestamo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styles: [
  ]
})
export class PrestamosComponent implements OnInit {

  public totalPrestamos: number = 0;
  public prestamos: Prestamo[] = [];
  public prestamosTemp: Prestamo[] = [];
  public cargando: boolean = true;
  public desde: number = 0;
  public mostrarBotones: boolean = true;
  public prestamoDetalle: Prestamo = new Prestamo('','',null,'',null,'','',null, null, '');
  public usuario: Usuario;

  constructor(private prestamoService: PrestamosService,
              private usuarioService: UsuarioService) 
  {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  /**
   * Metodo que permite cargar todos los prestamos que se encuentran asociados en la aplicacion.
   */
   cargarPrestamos() {
    this.cargando = true;
    this.prestamoService.cargarPrestamosDesde(this.desde).subscribe( ({ total, prestamos}) => {
      this.totalPrestamos = total;
      this.prestamos = prestamos;
      this.prestamosTemp = prestamos;
      this.cargando = false;

      this.prestamos.forEach(element => {
        element.monto = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(Number(element.monto));
      });
    });
  }
  
  /**
   * Metodo que permite paginar las transacciones de tipo prestamo en el front
   * @param valor 
   */
  cambiarPagina( valor: number) {
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    } else if (this.desde >= this.totalPrestamos) {
      this.desde -=  valor;
    }
    this.cargarPrestamos();
  }

  /**
   * Metodo que permite abstraer los datos de un prestamo el cual es seleccionado
   * en la vista principal por la grilla de prestamos.
   * @param prestamo Objeto tipo prestamo a quien se le consultara la informacion
   */
   verDetallesPrestamo(prestamo: Prestamo) {
    this.prestamoService.buscarPrestamoPorId( prestamo._id ).subscribe( prestamoRet => {
      this.prestamoDetalle = prestamoRet;

      if (this.prestamoDetalle.usuarioActualizacion == null){
        this.prestamoDetalle.usuarioActNombre = '';
      } else {
        this.prestamoDetalle.usuarioActNombre = this.prestamoDetalle.usuarioActualizacion.nombre;
      }
    });
  }

  /**
   * Metodo para cambiar el estado y el usuario que actualizo dicho estado
   * @param prestamo Objeto tipo prestamo a quien se le actualizara la data
   */
  cambiarEstado(prestamo: Prestamo) {
    if( prestamo.estado === 'CANCELADO TOTAL'){
      this.prestamoService.actualizarEstadoPrestamo( prestamo )
      .subscribe ( resp => {
        Swal.fire('Guardado', 'Se cambio el estado de ' + prestamo._id+ ' a CANCELADO.', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
        this.cargarPrestamos();
      });
    } else {
      Swal.fire('Error', 'No es posible hacer el cambio, el prestamo ya se encontraba cancelado.', 'error');
      this.cargarPrestamos();
    }
  }
  
  /**
   * 
   * @param prestamo 
   */
  eliminarPrestamo(prestamo: Prestamo) {
    if(this.usuario.role != 'ADMIN_ROLE'){
      Swal.fire('Error', 'No es posible eliminar la transacción, no tienes los privilegios suficientes.', 'error');
      this.cargarPrestamos();
    } else {
      Swal.fire({
        title: '<small>Esta seguro de eliminar la transacción </br>' + prestamo._id + '?</small>',
        text: '',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Sí, Eliminar!',
        cancelButtonText:'<i class="fa fa-thumbs-down"></i> Cancelar',
        backdrop: `
          rgba(0,0,123,0.4)
          url("./assets/images/gifs-swal/cat-nyan-cat.gif")
          left top
          no-repeat
        `
      }).then((result) => {
        if (result.isConfirmed){
          this.prestamoService.eliminarPrestamo( prestamo )
            .subscribe (resp => {
              Swal.fire(
                'Correcto!',
                'La transacción ha sido realizada exitosamente.',
                'success'
              );
              this.cargarPrestamos();
            });
        }
      });
    }
  }

}
