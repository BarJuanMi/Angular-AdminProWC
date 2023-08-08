import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado.model';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Pais } from 'src/app/models/pais.util.model';
import { Ciudad } from 'src/app/models/ciudad.util.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { TipoEmpleado } from 'src/app/models/tipoempleado.model';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-apoyologistico',
  templateUrl: './apoyologistico.component.html',
  styles: [
  ]
})
export class ApoyologisticoComponent implements OnInit {

  public totalApoyolog: number = 0;
  public empleApoyoLogs: Empleado[] = [];
  public empleApoyoLogsTemp: Empleado[] = [];
  public empleadoApoyoLogDetalle: Empleado = new Empleado('','','','','','','',new TipoEmpleado('','',''),null,'','','','','','',null,
                                                false,'',null,new Pais('','','',''),new Ciudad('','',''),'','',
                                                new Usuario('','',null,'','','',false,'','',''),'','','',null,'');
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public mostrarBotones: boolean = true;

  constructor(private empleadosService: EmpleadosService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarEmpleadosApoyoLog();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(300))
    .subscribe ( img => this.cargarEmpleadosApoyoLog() );
  }

  /**
   * 
   */
  cargarEmpleadosApoyoLog() {
    this.cargando = true;
    this.empleadosService.cargarEmpleadosxTipoDesde('apoyo',this.desde).subscribe( ({ total, empleados}) => {
      this.totalApoyolog = total;
      this.empleApoyoLogs = empleados;
      this.empleApoyoLogsTemp = empleados;
      this.cargando = false;
    });
  }

  /**
   * 
   * @param valor 
   */
  cambiarPagina( valor: number) {
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    } else if (this.desde >= this.totalApoyolog) {
      this.desde -=  valor;
    }

    this.cargarEmpleadosApoyoLog();
  }

  /**
   * 
   * @param termino 
   * @returns 
   */
  buscarApoyoLogTermino( termino: string) {
    // Mientras escribe las letras para la busqueda, se esconden los botones
    this.mostrarBotones = false;

    if ( termino.length === 0) {
      // Si ya no hay letras para la busqueda, aparecen los botones de nuevo
      this.mostrarBotones = true;
      return this.empleApoyoLogs = this.empleApoyoLogsTemp;
    }

    this.busquedasService.buscarTerminoEnEmpleados( 'empleados', 'apoyologistico', termino)
        .subscribe( (resultados: Empleado[]) => {
          this.empleApoyoLogs = resultados;
        });
  }

  /**
   * 
   * @param apoyolog 
   */
  abrilModalImagen( apoyolog: Empleado ) {
    this.modalImagenService.abrirModal('empleados', apoyolog._id, apoyolog.img);
  }

  /**
   * Metodo que permite inactivar a un apoyolog, cambiando el estado de la misma en el sistema
   * @param apoyolog Objeto de tipo apoyolog al cual se le cambiará el estado
   */
  inactivarApoyoLog( apoyolog: Empleado ) {
    Swal.fire({
      title: '<small>Esta seguro de inactivar al empleado ' + apoyolog.nombApellConca + '?</small>',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Sí, Inactivar!',
      cancelButtonText:'<i class="fa fa-thumbs-down"></i> Cancelar',
      backdrop: `
        rgba(0,0,123,0.4)
        url("./assets/images/gifs-swal/cat-nyan-cat.gif")
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed){
        this.empleadosService.modificarEstadoEmpleado( apoyolog, false )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'El empleado de apoyo logístico ha sido inactivada exitosamente.',
              'success'
            );
            this.cargarEmpleadosApoyoLog();
          });
      }
    });
  }

  /**
   * Metodo que permite reactivar a un apoyolog, cambiando el estado de la misma en el sistema
   * @param apoyolog Objeto de tipo apoyolog al cual se le cambiará el estado
   */
  reActivarApoyoLog( apoyolog: Empleado) {
    Swal.fire({
      title: '<small>Esta seguro de reactivar al empleado ' + apoyolog.nombApellConca + '?</small>',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Sí, Reactivar!!',
      cancelButtonText:'<i class="fa fa-thumbs-down"></i> Cancelar',
      backdrop: `
        rgba(0,0,123,0.4)
        url("./assets/images/gifs-swal/cat-nyan-cat.gif")
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed){
        this.empleadosService.modificarEstadoEmpleado( apoyolog, true )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'El empleado de apoyo logístico ha sido reactivada exitosamente en el sistema.',
              'success'
            );
            this.cargarEmpleadosApoyoLog();
          });
      }
    });
  }

  /**
   * Metodo que permite abstraer los datos demograficos y personales de un empleado de apoyo logistico
   * la cual es seleccionada en la vista principal por la grilla de administrativos.
   * @param apoyoLog Objeto tipo empleado de apoyo logistico a quien se le consultara la informacion
   */
  verDetallesEmplApoyoLog(apoyoLog: Empleado) {
    this.empleadosService.buscarEmpleadoPorId( apoyoLog._id ).subscribe( apoyoLogRet => {
      this.empleadoApoyoLogDetalle = apoyoLogRet;
    });
  }
}
