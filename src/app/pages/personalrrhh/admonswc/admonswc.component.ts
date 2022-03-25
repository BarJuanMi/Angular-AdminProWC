import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado.model';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Pais } from 'src/app/models/pais.util.model';
import { Ciudad } from 'src/app/models/ciudad.util.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { MAP_MONTHS } from 'src/app/utils/config';
import { TipoEmpleado } from 'src/app/models/tipoempleado.model';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-admonswc',
  templateUrl: './admonswc.component.html',
  styles: [
  ]
})
export class AdmonswcComponent implements OnInit {

  public totalAdmons: number = 0;
  public admons: Empleado[] = [];
  public admonsTemp: Empleado[] = [];
  public admonWCDetalle: Empleado = new Empleado('','','','','','','',new TipoEmpleado('','',''),null,'','','','','','',null,
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
    this.cargarEmpleadosAdmons();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(300))
    .subscribe ( img => this.cargarEmpleadosAdmons() );
  }

  /**
   * 
   */
   cargarEmpleadosAdmons() {
    this.cargando = true;
    this.empleadosService.cargarEmpleadosxTipoDesde('administrativo',this.desde).subscribe( ({ total, empleados}) => {
      this.totalAdmons = total;
      this.admons = empleados;
      this.admonsTemp = empleados;
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
    } else if (this.desde >= this.totalAdmons) {
      this.desde -=  valor;
    }

    this.cargarEmpleadosAdmons();
  }

  /**
   * 
   * @param termino 
   * @returns 
   */
  buscarAdmonsTermino( termino: string) {
    // Mientras escribe las letras para la busqueda, se esconden los botones
    this.mostrarBotones = false;

    if ( termino.length === 0) {
      // Si ya no hay letras para la busqueda, aparecen los botones de nuevo
      this.mostrarBotones = true;
      return this.admons = this.admonsTemp;
    }

    this.busquedasService.buscarTerminoEnEmpleados( 'empleados', 'administrativo', termino)
        .subscribe( (resultados: Empleado[]) => {
          this.admons = resultados;
        });
  }

  /**
   * 
   * @param administrativo 
   */
   abrilModalImagen( administrativo: Empleado ) {
    this.modalImagenService.abrirModal('empleados', administrativo._id, administrativo.img);
  }

  /**
   * Metodo que permite inactivar a un administrativo, cambiando el estado de la misma en el sistema
   * @param administrativo Objeto de tipo administrativo al cual se le cambiará el estado
   */
  inactivarAdmon( administrativo: Empleado ) {
    Swal.fire({
      title: '<small>Esta seguro de inactivar al empleado ' + administrativo.nombApellConca + '?</small>',
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
        this.empleadosService.modificarEstadoEmpleado( administrativo, false )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'El empleado administrativo ha sido inactivada exitosamente.',
              'success'
            );
            this.cargarEmpleadosAdmons();
          });
      }
    });
  }

  /**
   * Metodo que permite reactivar a un administrativo, cambiando el estado de la misma en el sistema
   * @param administrativo Objeto de tipo administrativo al cual se le cambiará el estado
   */
   reActivarAdmon( administrativo: Empleado) {
    Swal.fire({
      title: '<small>Esta seguro de reactivar al empleado ' + administrativo.nombApellConca + '?</small>',
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
        this.empleadosService.modificarEstadoEmpleado( administrativo, true )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'El empleado administrativo ha sido reactivada exitosamente en el sistema.',
              'success'
            );
            this.cargarEmpleadosAdmons();
          });
      }
    });
  }

  /**
   * Metodo que permite abstraer los datos demograficos y personales de un administrativo
   * la cual es seleccionada en la vista principal por la grilla de administrativos.
   * @param administrativo Objeto tipo administrativo a quien se le consultara la informacion
   */
   verDetallesAdmon(administrativo: Empleado) {
    this.empleadosService.buscarEmpleadoParticular( administrativo ).subscribe( administrativoRet => {
      this.admonWCDetalle = administrativoRet;
    });
  }




}
