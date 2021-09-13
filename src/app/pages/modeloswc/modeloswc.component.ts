import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ModeloWC } from 'src/app/models/modelowc.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { ModelosService } from '../../services/modelos.service';
import { MAP_MONTHS } from 'src/app/utils/config';
import { Pais } from 'src/app/models/pais.util.model';
import { Ciudad } from 'src/app/models/ciudad.util.model';

@Component({
  selector: 'app-modeloswc',
  templateUrl: './modeloswc.component.html',
  styles: [
  ]
})
export class ModeloswcComponent implements OnInit {

  public totalModelos: number = 0;
  public modelos: ModeloWC[] = [];
  public modelosTemp: ModeloWC[] = [];
  public modeloWCDetalle: ModeloWC = new ModeloWC('', '', '', '', '', '', '', '', '', '', '', '', '', '',
                      false, '', '', new Pais('', '', '', ''), new Ciudad('', '', ''), '', '', '', '', '');
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public mostrarBotones: boolean = true;

  constructor(private modeloService: ModelosService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarModelos();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(300))
    .subscribe ( img => this.cargarModelos() );
  }

  /**
   * 
   */
  cargarModelos() {
    this.cargando = true;
    this.modeloService.cargarModelosDesde(this.desde).subscribe( ({ total, modelos}) => {
      this.totalModelos = total;
      this.modelos = modelos;
      this.modelosTemp = modelos;
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

    this.cargarModelos();
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

    this.busquedasService.buscarPorColeccion( 'modelos', termino)
        .subscribe( (resultados: ModeloWC[]) => {
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
  inactivarModelo( modelo: ModeloWC) {
    Swal.fire({
      title: '<small>Esta seguro de inactivar la modelo ' + modelo.nombres + ' ' + modelo.apellidos + '?</small>',
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
        this.modeloService.modificarEstadoModelo( modelo, false )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'La modelo ha sido inactivada exitosamente.',
              'success'
            );
            this.cargarModelos();
          });
      }
    });
  }

  /**
   * Metodo que permite reactivar a una modelo, cambiando el estado de la misma en el sistema
   * @param modelo Objeto de tipo modelo al cual se le cambiará el estado
   */
   reActivarModelo( modelo: ModeloWC) {
    Swal.fire({
      title: '<small>Esta seguro de reactivar la modelo ' + modelo.nombres + ' ' + modelo.apellidos + '?</small>',
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
        this.modeloService.modificarEstadoModelo( modelo, true )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'La modelo ha sido reactivada exitosamente en el sistema.',
              'success'
            );
            this.cargarModelos();
          });
      }
    });
  }

  /**
   * Metodo que permite abstraer los datos demograficos y personales de una modelo
   * la cual es seleccionada en la vista principal por la grilla de modelos.
   * @param modelo Objeto tipo modelo a quien se le consultara la informacion
   */
   verDetallesModelo(modelo: ModeloWC) {
    this.modeloService.buscarModeloParticularWC( modelo ).subscribe( modeloRet => {
      this.modeloWCDetalle = modeloRet;

      console.log(this.modeloWCDetalle.nacionalidad.countryName);
      console.log(this.modeloWCDetalle.ciudadResidencia.ciudadName);

      const fNacFormat = new Date(this.modeloWCDetalle.fechaNac);
      const fIngFormat = new Date(this.modeloWCDetalle.fechaIngreso);
      const fCreaFormat = new Date(this.modeloWCDetalle.fechaCreacionApp);
      const fInacFormat = new Date(this.modeloWCDetalle.fechaInactivacion);

      this.modeloWCDetalle.fechaNac = fNacFormat.getDate() + '-' + MAP_MONTHS.get(fNacFormat.getMonth()) + '-' + fNacFormat.getFullYear();
      this.modeloWCDetalle.fechaIngreso = fIngFormat.getDate() + '-' + MAP_MONTHS.get(fIngFormat.getMonth())
      + '-' + fIngFormat.getFullYear();
      this.modeloWCDetalle.fechaCreacionApp = fCreaFormat.getDate() + '-' + MAP_MONTHS.get(fCreaFormat.getMonth())
      + '-' + fCreaFormat.getFullYear();
      this.modeloWCDetalle.fechaInactivacion = fInacFormat.getDate() + '-' + MAP_MONTHS.get(fInacFormat.getMonth())
      + '-' + fInacFormat.getFullYear();
    });
  }

}
