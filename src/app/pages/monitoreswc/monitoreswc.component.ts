import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { MonitorWC } from 'src/app/models/monitorwc.model';
import { MAP_MONTHS } from 'src/app/utils/config';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { MonitoresService } from 'src/app/services/monitores.service';

@Component({
  selector: 'app-monitoreswc',
  templateUrl: './monitoreswc.component.html',
  styles: [
  ]
})
export class MonitoreswcComponent implements OnInit {

  public totalMonitores: number = 0;
  public monitores: MonitorWC[] = [];
  public monitoresTemp: MonitorWC[] = [];
  public monitorWCDetalle: MonitorWC = new MonitorWC('','','','','','','','','','','','','','',false,false,'','','','','','','');
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public mostrarBotones: boolean = true;

  constructor(private monitorService: MonitoresService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }


  ngOnInit(): void {
    this.cargarMonitores();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(300))
    .subscribe ( img => this.cargarMonitores() );
  }
  
  /**
   * 
   */
   cargarMonitores() {
    this.cargando = true;
    this.monitorService.cargarMonitoresDesde(this.desde).subscribe( ({ total, monitores}) => {
      this.totalMonitores = total;
      this.monitores = monitores;
      this.monitoresTemp = monitores;
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

    this.cargarMonitores();
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

    this.busquedasService.buscarPorColeccion( 'monitores', termino)
        .subscribe( (resultados: MonitorWC[]) => {
          this.monitores = resultados;
        });
  }

  /**
   * 
   * @param monitor 
   */
   abrilModalImagen( monitor: MonitorWC) {
    this.modalImagenService.abrirModal('monitores', monitor._id, monitor.img);
  }

  /**
   * 
   * @param monitor 
   */
   inactivarMonitor( monitor: MonitorWC) {
    Swal.fire({
      title: 'Esta seguro de inactivar el monitor '+ monitor.nombres +' '+ monitor.apellidos+'?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Inactivarla!',
      backdrop: `
        rgba(0,0,123,0.4)
        url("./assets/images/gifs-swal/cat-nyan-cat.gif")
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed){
        this.monitorService.modificarEstadoMonitor( monitor, false )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'El monitor ha sido inactivado exitosamente.',
              'success'
            );
            this.cargarMonitores();   
          });
      }
    });
  }

  /**
   * 
   * @param modelo 
   */
   reActivarMonitor( monitor: MonitorWC) {
    Swal.fire({
      title: 'Esta seguro de reactivar el monitor '+monitor.nombres+' '+monitor.apellidos+'?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Confirmo la operación',
      backdrop: `
        rgba(0,0,123,0.4)
        url("./assets/images/gifs-swal/cat-nyan-cat.gif")
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed){
        this.monitorService.modificarEstadoMonitor( monitor, true )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'El monitor ha sido reactivado exitosamente en el sistema.',
              'success'
            );
            this.cargarMonitores();   
          });
      }
    });
  }

  /**
   * Metodo que permite abstraer los datos demograficos y personales de una monitor
   * la cual es seleccionada en la vista principal por la grilla de monitors.
   * @param monitor Objeto tipo monitor a quien se le consultara la informacion
   */
   verDetallesMonitor(monitor: MonitorWC) {
    this.monitorService.buscarMonitorParticularWC( monitor ).subscribe( monitorRet => {
      this.monitorWCDetalle = monitorRet;

      let fNacFormat = new Date(this.monitorWCDetalle.fechaNac);
      let fIngFormat = new Date(this.monitorWCDetalle.fechaIngreso);
      let fCreaFormat = new Date(this.monitorWCDetalle.fechaCreacionApp);
      let fInacFormat = new Date(this.monitorWCDetalle.fechaInactivacion);

      this.monitorWCDetalle.fechaNac = fNacFormat.getDate() + '-' + MAP_MONTHS.get(fNacFormat.getMonth()) + '-' + fNacFormat.getFullYear();
      this.monitorWCDetalle.fechaIngreso = fIngFormat.getDate() + '-' + MAP_MONTHS.get(fIngFormat.getMonth()) + '-' + fIngFormat.getFullYear();
      this.monitorWCDetalle.fechaCreacionApp = fCreaFormat.getDate() + '-' + MAP_MONTHS.get(fCreaFormat.getMonth()) + '-' + fCreaFormat.getFullYear();
      this.monitorWCDetalle.fechaInactivacion = fInacFormat.getDate() + '-' + MAP_MONTHS.get(fInacFormat.getMonth()) + '-' + fInacFormat.getFullYear();
    });
  }

}
