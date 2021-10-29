import { Component, OnInit } from '@angular/core';
import { AdmonWC } from 'src/app/models/admonwc.model';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Pais } from 'src/app/models/pais.util.model';
import { Ciudad } from 'src/app/models/ciudad.util.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { MAP_MONTHS } from 'src/app/utils/config';
import { AdmonsService } from 'src/app/services/admons.service';

@Component({
  selector: 'app-admonswc',
  templateUrl: './admonswc.component.html',
  styles: [
  ]
})
export class AdmonswcComponent implements OnInit {

  public totalAdmons: number = 0;
  public admons: AdmonWC[] = [];
  public admonsTemp: AdmonWC[] = [];
  public admonWCDetalle: AdmonWC = new AdmonWC('', '', '', '', '', '', '', '', '', '', '', '', '', '',
                      false, '', '', new Pais('', '', '', ''), new Ciudad('', '', ''), '', '', '', '', '');
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public mostrarBotones: boolean = true;

  constructor(private admonService: AdmonsService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarAdmons();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(300))
    .subscribe ( img => this.cargarAdmons() );
  }

  /**
   * 
   */
   cargarAdmons() {
    this.cargando = true;
    this.admonService.cargarAdmonsDesde(this.desde).subscribe( ({ total, administrativos}) => {
      this.totalAdmons = total;
      this.admons = administrativos;
      this.admonsTemp = administrativos;
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

    this.cargarAdmons();
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

    this.busquedasService.buscarPorColeccion( 'administrativos', termino)
        .subscribe( (resultados: AdmonWC[]) => {
          this.admons = resultados;
        });
  }

  /**
   * 
   * @param administrativo 
   */
   abrilModalImagen( administrativo: AdmonWC ) {
    this.modalImagenService.abrirModal('administrativos', administrativo._id, administrativo.img);
  }

  /**
   * Metodo que permite inactivar a un administrativo, cambiando el estado de la misma en el sistema
   * @param administrativo Objeto de tipo administrativo al cual se le cambiará el estado
   */
  inactivarAdmon( administrativo: AdmonWC ) {
    Swal.fire({
      title: '<small>Esta seguro de inactivar al empleado ' + administrativo.nombres + ' ' + administrativo.apellidos + '?</small>',
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
        this.admonService.modificarEstadoAdministrativo( administrativo, false )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'El empleado administrativo ha sido inactivada exitosamente.',
              'success'
            );
            this.cargarAdmons();
          });
      }
    });
  }

  /**
   * Metodo que permite reactivar a un administrativo, cambiando el estado de la misma en el sistema
   * @param administrativo Objeto de tipo administrativo al cual se le cambiará el estado
   */
   reActivarAdmon( administrativo: AdmonWC) {
    Swal.fire({
      title: '<small>Esta seguro de reactivar al empleado ' + administrativo.nombres + ' ' + administrativo.apellidos + '?</small>',
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
        this.admonService.modificarEstadoAdministrativo( administrativo, true )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'El empleado administrativo ha sido reactivada exitosamente en el sistema.',
              'success'
            );
            this.cargarAdmons();
          });
      }
    });
  }

  /**
   * Metodo que permite abstraer los datos demograficos y personales de un administrativo
   * la cual es seleccionada en la vista principal por la grilla de administrativos.
   * @param administrativo Objeto tipo administrativo a quien se le consultara la informacion
   */
   verDetallesAdmon(administrativo: AdmonWC) {
    this.admonService.buscarAdministrativoParticularWC( administrativo ).subscribe( administrativoRet => {
      this.admonWCDetalle = administrativoRet;

      const fNacFormat = new Date(this.admonWCDetalle.fechaNac);
      const fIngFormat = new Date(this.admonWCDetalle.fechaIngreso);
      const fCreaFormat = new Date(this.admonWCDetalle.fechaCreacionApp);
      const fInacFormat = new Date(this.admonWCDetalle.fechaInactivacion);

      this.admonWCDetalle.fechaNac = fNacFormat.getDate() + '-' + MAP_MONTHS.get(fNacFormat.getMonth()) + '-' + fNacFormat.getFullYear();
      this.admonWCDetalle.fechaIngreso = fIngFormat.getDate() + '-' + MAP_MONTHS.get(fIngFormat.getMonth())
      + '-' + fIngFormat.getFullYear();
      this.admonWCDetalle.fechaCreacionApp = fCreaFormat.getDate() + '-' + MAP_MONTHS.get(fCreaFormat.getMonth())
      + '-' + fCreaFormat.getFullYear();
      this.admonWCDetalle.fechaInactivacion = fInacFormat.getDate() + '-' + MAP_MONTHS.get(fInacFormat.getMonth())
      + '-' + fInacFormat.getFullYear();
    });
  }




}
