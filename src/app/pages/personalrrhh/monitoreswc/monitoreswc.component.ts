import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Empleado } from 'src/app/models/empleado.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { TipoEmpleado } from 'src/app/models/tipoempleado.model';
import { Ciudad } from 'src/app/models/ciudad.util.model';
import { Pais } from 'src/app/models/pais.util.model';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-monitoreswc',
  templateUrl: './monitoreswc.component.html',
  styles: [
  ]
})
export class MonitoreswcComponent implements OnInit {

  public totalMonitores: number = 0;
  public monitores: Empleado[] = [];
  public monitoresTemp: Empleado[] = [];
  public monitorWCDetalle: Empleado = new Empleado('','','','','','','',new TipoEmpleado('','',''),null,'','','','','','',null,
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
    this.cargarEmpleadosMonitores();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(300))
    .subscribe ( img => this.cargarEmpleadosMonitores() );
  }
  
  /**
   * 
   */
   cargarEmpleadosMonitores() {
    this.cargando = true;
    this.empleadosService.cargarEmpleadosxTipoDesde('monitor', this.desde).subscribe( ({ total, empleados}) => {
      this.totalMonitores = total;
      this.monitores = empleados;
      this.monitoresTemp = empleados;
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
    } else if (this.desde >= this.totalMonitores) {
      this.desde -=  valor;
    }

    this.cargarEmpleadosMonitores();
  }

  /**
   * 
   * @param termino 
   * @returns 
   */
   buscarMonitorTermino( termino: string) {
    //Mientras escribe las letras para la busqueda, se esconden los botones
    this.mostrarBotones = false;

    if( termino.length === 0) {
      //Si ya no hay letras para la busqueda, aparecen los botones de nuevo
      this.mostrarBotones = true;
      return this.monitores = this.monitoresTemp;
    }

    this.busquedasService.buscarTerminoEnEmpleados( 'empleados', 'monitor', termino)
        .subscribe( (resultados: Empleado[]) => {
          this.monitores = resultados;
        });
  }

  /**
   * 
   * @param monitor 
   */
   abrilModalImagen( monitor: Empleado) {
    this.modalImagenService.abrirModal('monitores', monitor._id, monitor.img);
  }

  /**
   * 
   * @param monitor 
   */
   inactivarMonitor( monitor: Empleado) {
    Swal.fire({
      title: '<small>Esta seguro de inactivar el monitor '+ monitor.nombApellConca + '?<small>',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Sí, Inactivar!!',
      cancelButtonText:'<i class="fa fa-thumbs-down"></i> Cancelar',
      backdrop: `
        rgba(0,0,123,0.4)
        url("./assets/images/gifs-swal/cat-nyan-cat.gif")
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed){
        this.empleadosService.modificarEstadoEmpleado( monitor, false )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'El monitor ha sido inactivado exitosamente.',
              'success'
            );
            this.cargarEmpleadosMonitores();   
          });
      }
    });
  }

  /**
   * 
   * @param modelo 
   */
   reActivarMonitor( monitor: Empleado) {
    Swal.fire({
      title: '<small>Esta seguro de reactivar el monitor '+monitor.nomContEmer + '?<small>',
      text: "",
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
        this.empleadosService.modificarEstadoEmpleado( monitor, true )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'El monitor ha sido reactivado exitosamente en el sistema.',
              'success'
            );
            this.cargarEmpleadosMonitores();   
          });
      }
    });
  }

  /**
   * Metodo que permite abstraer los datos demograficos y personales de una monitor
   * la cual es seleccionada en la vista principal por la grilla de monitors.
   * @param monitor Objeto tipo monitor a quien se le consultara la informacion
   */
   verDetallesMonitor(monitor: Empleado) {
    this.empleadosService.buscarEmpleadoParticular( monitor ).subscribe( monitorRet => {
      this.monitorWCDetalle = monitorRet;
    });
  }

}
