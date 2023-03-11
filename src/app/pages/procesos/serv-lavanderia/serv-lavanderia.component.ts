import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from '../../../models/usuario.model';
import { ModalImageLargeService } from '../../../services/modal-image-large.service';
import { Servlavanderia } from '../../../models/servlavanderia.model';
import { ServLavanderiaService } from '../../../services/serv-lavanderia.service';
import { Sede } from '../../../models/sede.util.model';
import { Ciudad } from '../../../models/ciudad.util.model';
import { Localidad } from '../../../models/localidad.util.model';

@Component({
  selector: 'app-serv-lavanderia',
  templateUrl: './serv-lavanderia.component.html',
  styles: [
  ]
})
export class ServLavanderiaComponent implements OnInit {

  public totalServicios: number = 0;
  public servLavanderias: Servlavanderia[] = [];
  public servLavanderiasTemp: Servlavanderia[] = [];
  public desde: number = 0;
  public mostrarBotones: boolean = true;
  public servLavDetalle = new Servlavanderia('','',new Sede('','',0,0,'',new Ciudad('','',''),new Localidad('','',''))
                                            ,'',new Usuario('','',null,'','','',false,'','',''),null,null,null,'','',false,
                                            new Usuario('','',null,'','','',false,'','',''),'','');
  public imgSubs: Subscription;
  public usuario: Usuario;

  constructor(private servLavanderiaService: ServLavanderiaService,
              private modalImageLargeService: ModalImageLargeService) { }

  ngOnInit(): void {
    this.cargarServsLavanderia();
    this.imgSubs = this.modalImageLargeService.nuevaImagenLarge
    .pipe(delay(300))
    .subscribe ( img => this.cargarServsLavanderia() );
  }

  /**
   * Metodo que permite cargar todos los servicios de lavanderia que se encuentran asociados en la aplicacion.
   */
  cargarServsLavanderia() {
    this.servLavanderiaService.cargarServLavanderiaDesde(this.desde).subscribe( ({ total, servlavanderias}) => {
      this.totalServicios = total;
      this.servLavanderias = servlavanderias;
      this.servLavanderiasTemp = servlavanderias;
    });
  }

  /**
   * 
   * @param vacunado 
   */
  abrilModalImagenLarge( servLava: Servlavanderia) {
    this.modalImageLargeService.abrirModalLarge('servlavanderia', servLava._id, servLava.img);
  }

  /**
   * Metodo que permite abstraer los datos de un servicio de lavanderia el cual es seleccionado
   * en la vista principal por la grilla de servicios de lavanderia.
   * @param retiro Objeto tipo servicio de lavanderia a quien se le consultara la informacion
   */
  verDetallesServLavan( servLava: Servlavanderia ) {
    this.servLavanderiaService.buscarServLavanPorId( servLava._id ).subscribe( servLavaRet => {
      this.servLavDetalle = servLavaRet;
    });
  }

  /**
   * Metodo que permite paginar las transacciones de tipo servicio de lavanderia en el front
   * @param valor 
   */
  cambiarPagina( valor: number) {
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    } else if (this.desde >= this.totalServicios) {
      this.desde -=  valor;
    }
    this.cargarServsLavanderia();
  }
  
  /**
   * 
   * @param servLava 
   */
  actualizarEstadoServLavan = async( servLava: Servlavanderia ) => {
    const { value: formValues } = await Swal.fire({
      title: '<h3>Actualiza el estado del servicio de lavanderia</h3>',
      html:
      '<div class="row p-t-20">'+
        '<div class="col-md-6">'+
          '<div class="form-group">'+
            '<label class="control-label label-form-decora">Fecha de Recepción</label>'+
            '<div class="input-group">'+
              '<div class="input-group-addon"><i class="ti-calendar"></i></div>'+
              '<input id="swal-input1" class="form-control" placeholder="dd/mm/yyyy" type="date">'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
          '<div class="form-group">'+
            '<label class="control-label label-form-decora">¿Recibido OK?</label>'+
            '<div class="input-group">'+
              '<div class="input-group-addon"><i class="ti-face-smile"></i></div>'+				
              '<select id="swal-input2" class="form-control custom-select">'+
                '<option value="SI">SI</option>'+
                '<option value="NO">NO</option>'+
              '</select>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="col-md-12">'+
          '<div class="form-group">'+
            '<label class="control-label label-form-decora">Observaciones con la recepción</label>'+
            '<div class="input-group">'+
              '<div class="input-group-addon"><i class="ti-heart"></i></div>'+
              '<textarea id="swal-input3" class="form-control text-area"></textarea>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>',
      focusConfirm: true,
      showCancelButton: true,
      showCloseButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!',
      cancelButtonText:'<i class="fa fa-thumbs-down"></i> Cancelar',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value,
          (<HTMLInputElement>document.getElementById('swal-input3')).value
        ]
      }
    })

    if (formValues) {
      if(formValues[0] !== '') {
        this.servLavanderiaService.actualizaEstadoServLavan(servLava, formValues[0], formValues[1], formValues[2])
          .subscribe (resp => {
            if(resp.status){
              Swal.fire('Correcto!', resp.msg, 'success');
            } else { 
              Swal.fire('Error!', resp.msg, 'error');
            }
            this.cargarServsLavanderia();
          });  
      }else{
        Swal.fire('Error!', 'Debes proveer una fecha de Recepción', 'error');
      }
    }
  }

  /**
   * 
   * @param servLavan 
   */
  eliminarServLavan( servLavan: Servlavanderia ) {
    Swal.fire({
      title: '<small>Esta seguro de eliminar la transacción </br>' + servLavan._id + '?</small>',
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
        this.servLavanderiaService.eliminarServLavan( servLavan )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'El registro ha sido eliminado exitosamente.',
              'success'
            );
            this.cargarServsLavanderia();
          });
      }
    });
  }

}
