import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { PqrsiService } from '../../../services/pqrsi.service';
import { UtileslistService } from '../../../services/utileslist.service';
import { Ciudad } from '../../../models/ciudad.util.model';
import { Empleado } from '../../../models/empleado.model';
import { Localidad } from '../../../models/localidad.util.model';
import { Pais } from '../../../models/pais.util.model';
import { Sede } from '../../../models/sede.util.model';
import { TipoEmpleado } from '../../../models/tipoempleado.model';
import { TipoPQRS } from '../../../models/tipopqrs.model';
import { PQRS } from '../../../models/pqrs.model';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styles: [
  ]
})
export class PqrsComponent implements OnInit {

  public totalPQRS: number = 0;
  public tipoPQRSList: TipoPQRS [] = [];
  public pqrsi: PQRS[] = [];
  public pqrsiTemp: PQRS[] = [];
  public usuario: Usuario;
  public pqrsiDetalle: PQRS = new PQRS('','','','',false,null,null,new Sede('','',0,0,'',new Ciudad('','',''),new Localidad('','','')),
                                            new Empleado('','','','','','','',new TipoEmpleado('','',''),null,'','','','','','',null,
                                            false,'',null,new Pais('','','',''),new Ciudad('','',''),'','',
                                            new Usuario('','',null,'','','',false,'','',''),'',null,''),
                                            new TipoPQRS('','','',null),new Usuario('','',null,'','','',false,'',''),
                                            new Usuario('','',null,'','','',false,'',''),'','','');
  
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public mostrarBotones: boolean = true;

  constructor(private pqrsiService: PqrsiService,
              private modalImagenService: ModalImagenService,
              private usuarioService: UsuarioService,
              private utilesListService: UtileslistService) 
  { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.cargarPQRSI();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(300))
    .subscribe ( img => this.cargarPQRSI() );
  }

  cargarListadoTipoPQRS() {
    this.utilesListService.cargarTipoPQRSList().subscribe(({tipospqrs}) => {
      this.tipoPQRSList = tipospqrs; 
    })
  }

  /**
   * 
   */
  cargarPQRSI() {
    this.cargando = true;
    this.pqrsiService.cargarPQRSIDesde(this.desde).subscribe( ({ total, pqrsi}) => {
      this.totalPQRS = total;
      this.pqrsi = pqrsi;
      this.pqrsiTemp = pqrsi;
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
    } else if (this.desde >= this.totalPQRS) {
      this.desde -=  valor;
    }
    this.cargarPQRSI();
  }

  /**
   * Metodo que permite abril el modal para el cargue de la evidencia asociada a la pqrs
   * @param pqrs Objeto tipo pqrs a la que se le consultara la informacion 
   */
  abrilModalImagen( pqrs: PQRS) {
    this.modalImagenService.abrirModal('pqrs', pqrs._id, pqrs.img);
  }

  /**
   * Metodo que permite abstraer los datos en detalle de una PQRS.
   * @param pqrs Objeto tipo pqrs a la que se le consultara la informacion
   */
   verDetallesPQRS( pqrs: PQRS ) {
    this.pqrsiService.buscarPQRSParticular( pqrs ).subscribe( pqrsRet => {
      this.pqrsiDetalle = pqrsRet;
    });
  }
  
  /**
   * Metodo que permite filtrar los pqrs que fue asociada al usuario de la sesión web
   */
   filterPQRSToMe = async() => {
    this.pqrsiService.buscarPQRSFiltradas( this.usuario, this.desde ) .subscribe( ({ total, pqrsi}) => {
      this.totalPQRS = total;
      this.pqrsi = pqrsi;
      this.pqrsiTemp = pqrsi;
      this.cargando = false;
    });
  }

  /**
   * Metodo que permite eliminar una pqrs de forma individual.
   * @param pqrs Objeto tipo pqrs a la que se le consultara la informacion
   */
  eliminarPQRS( pqrs: PQRS ) {
    if(this.usuario.role != 'ADMIN_ROLE' &&  this.usuario.role != 'USER_ROLE'){
      Swal.fire('Error', 'No es posible eliminar la transacción, no tienes los privilegios suficientes.', 'error');
      this.cargarPQRSI();
    } else {
      Swal.fire({
        title: '<small>Esta seguro de eliminar la PQRS </br>' + pqrs._id + '?</small>',
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
          this.pqrsiService.eliminarPQRS( pqrs )
            .subscribe (resp => {
              Swal.fire(
                'Correcto!',
                'El registro ha sido eliminado exitosamente.',
                'success'
              );
              this.cargarPQRSI();
            });
        }
      });
    }
  }
  
  /**
   * 
   * @param pqrs 
   */
  actualizarEstadoPQRS = async( pqrs: PQRS ) => {
    const { value: formValues } = await Swal.fire({
      title: '<h3>Actualiza el estado de la PQRS</h3>',
      html:
      '<div class="row p-t-20">'+
        '<div class="col-md-6">'+
          '<div class="form-group">'+
            '<label class="control-label label-form-decora">Estado</label>'+
            '<div class="input-group">'+
              '<div class="input-group-addon"><i class="ti-face-smile"></i></div>'+				
              '<select id="swal-input1" class="form-control custom-select">'+
                '<option value="PENDIENTE">PENDIENTE</option>'+
                '<option value="INVESTIGANDO">INVESTIGANDO</option>'+
                '<option value="RESUELTO">RESUELTO</option>'+
              '</select>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
          '<div class="form-group">'+
            '<label class="control-label label-form-decora">Estado</label>'+
            '<div class="input-group">'+
              '<div class="input-group-addon"><i class="ti-face-smile"></i></div>'+				
              '<select id="swal-input2" class="form-control custom-select">'+
                '<option value="URGENTE">URGENTE</option>'+
                '<option value="ALTA">ALTA</option>'+
                '<option value="MEDIA">MEDIA</option>'+
                '<option value="BAJA">BAJA</option>'+
              '</select>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="col-md-12">'+
          '<div class="form-group">'+
            '<label class="control-label label-form-decora">Respuesta a la PQRS</label>'+
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
      if(formValues[2] !== '') {
        this.pqrsiService.actualizarEstadoPQRS( pqrs, formValues[0], formValues[1], formValues[2])
          .subscribe (resp => {
            if(resp.status){
              Swal.fire('Correcto!', resp.msg, 'success');
            } else { 
              Swal.fire('Error!', resp.msg, 'error');
            }
            this.cargarPQRSI();
          });  
      }else{
        Swal.fire('Error!', 'Debes proveer una respuesta.', 'error');
      }
    }
  }
}
