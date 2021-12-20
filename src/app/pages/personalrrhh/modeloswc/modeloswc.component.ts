import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ModeloWC } from 'src/app/models/modelowc.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Pais } from 'src/app/models/pais.util.model';
import { Ciudad } from 'src/app/models/ciudad.util.model';
import { Empleado } from 'src/app/models/empleado.model';
import { TipoEmpleado } from 'src/app/models/tipoempleado.model';
import { EmpleadosService } from '../../../services/empleados.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-modeloswc',
  templateUrl: './modeloswc.component.html',
  styles: [
  ]
})
export class ModeloswcComponent implements OnInit {

  public totalModelos: number = 0;
  public modelos: Empleado[] = [];
  public modelosTemp: Empleado[] = [];
  public modeloWCDetalle: Empleado = new Empleado('','','','','','','',new TipoEmpleado('','',''),null,'','','','','','',null,
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
    this.cargarEmpleadosModelos();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(300))
    .subscribe ( img => this.cargarEmpleadosModelos() );
  }

  /**
   * 
   */
  cargarEmpleadosModelos() {
    this.cargando = true;
    this.empleadosService.cargarEmpleadosxTipoDesde('modelo', this.desde).subscribe( ({ total, empleados}) => {
      this.totalModelos = total;
      this.modelos = empleados;
      this.modelosTemp = empleados;
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
    } else if (this.desde >= this.totalModelos) {
      this.desde -=  valor;
    }

    this.cargarEmpleadosModelos();
  }

  /**
   * 
   * @param termino 
   * @returns 
   */
  buscarModelosTermino( termino: string) {
    // Mientras escribe las letras para la busqueda, se esconden los botones
    this.mostrarBotones = false;

    if ( termino.length === 0) {
      // Si ya no hay letras para la busqueda, aparecen los botones de nuevo
      this.mostrarBotones = true;
      return this.modelos = this.modelosTemp;
    }

    this.busquedasService.buscarTerminoEnEmpleados( 'empleados', 'modelo', termino)
        .subscribe( (resultados: Empleado[]) => {
          this.modelos = resultados;
        });
  }

  /**
   * 
   * @param modelo 
   */
  abrilModalImagen( modelo: ModeloWC) {
    this.modalImagenService.abrirModal('modelos', modelo._id, modelo.img);
  }

  /**
   * Metodo que permite inactivar a una modelo, cambiando el estado de la misma en el sistema
   * @param modelo Objeto de tipo modelo al cual se le cambiará el estado
   */
  inactivarModelo( modelo: Empleado) {
    Swal.fire({
      title: '<small>Esta seguro de inactivar la modelo ' + modelo.nombApellConca + '?</small>',
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
        this.empleadosService.modificarEstadoEmpleado( modelo, false )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'La modelo ha sido inactivada exitosamente.',
              'success'
            );
            this.cargarEmpleadosModelos();
          });
      }
    });
  }

  /**
   * Metodo que permite reactivar a una modelo, cambiando el estado de la misma en el sistema
   * @param modelo Objeto de tipo modelo al cual se le cambiará el estado
   */
   reActivarModelo( modelo: Empleado) {
    Swal.fire({
      title: '<small>Esta seguro de reactivar la modelo ' + modelo.nombApellConca + '?</small>',
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
        this.empleadosService.modificarEstadoEmpleado( modelo, true )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'La modelo ha sido reactivada exitosamente en el sistema.',
              'success'
            );
            this.cargarEmpleadosModelos();
          });
      }
    });
  }

  /**
   * Metodo que permite abstraer los datos demograficos y personales de una modelo
   * la cual es seleccionada en la vista principal por la grilla de modelos.
   * @param modelo Objeto tipo modelo a quien se le consultara la informacion
   */
   verDetallesModelo(modelo: Empleado) {
    this.empleadosService.buscarEmpleadoParticular( modelo ).subscribe( modeloRet => {
      this.modeloWCDetalle = modeloRet;
    });
  }

}
