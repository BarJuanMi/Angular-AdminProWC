import { Component, OnInit } from '@angular/core';
import { Vacunado } from 'src/app/models/vacunado.model';
import { Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImageLargeService } from 'src/app/services/modal-image-large.service';
import { VacunadosService } from 'src/app/services/vacunas.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vacunas-codiv19',
  templateUrl: './vacunas-codiv19.component.html',
  styles: [
  ]
})
export class VacunasCodiv19Component implements OnInit {

  public totalVacunados: number = 0;
  public vacunados: Vacunado[] = [];
  public vacunadosTemp: Vacunado[] = [];
  public vacunadoDetalle: Vacunado = new Vacunado('','','','','','',null,null,null,null,null,'',null,false,'');
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public mostrarBotones: boolean = true;

  constructor(private vacunadosService: VacunadosService,
              private busquedasService: BusquedasService,
              private modalImageLargeService: ModalImageLargeService) { }

  ngOnInit(): void {
    this.cargarVacunados();
    this.imgSubs = this.modalImageLargeService.nuevaImagenLarge
    .pipe(delay(300))
    .subscribe ( img => this.cargarVacunados() );
  }

  /**
   * Metodo que permite cargar todos los prestamos que se encuentran asociados en la aplicacion.
   */
   cargarVacunados() {
    this.cargando = true;
    this.vacunadosService.cargarVacunadosDesde(this.desde).subscribe( ({ total, vacunados}) => {
      this.totalVacunados = total;
      this.vacunados = vacunados;
      this.vacunadosTemp = vacunados;
      this.cargando = false;
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
    } else if (this.desde >= this.totalVacunados) {
      this.desde -=  valor;
    }
    this.cargarVacunados();
  }

  /**
   * 
   * @param vacunado 
   */
  abrilModalImagenLarge( vacunado: Vacunado) {
    this.modalImageLargeService.abrirModalLarge('vacunados', vacunado._id, vacunado.img);
  }
  
  /**
   * 
   * @param vacunado 
   */
  adicionarRegDosis = async( vacunado: Vacunado) => {
    const { value: formValues } = await Swal.fire({
      title: '<h3>Nuevo registro de dosis</h3>',
      html:
      '<div class="row p-t-20">'+
        '<div class="col-md-6">'+
          '<div class="form-group">'+
            '<label class="control-label label-form-decora">Fecha Dosis</label>'+
            '<div class="input-group">'+
              '<div class="input-group-addon"><i class="ti-calendar"></i></div>'+
              '<input id="swal-input1" class="form-control" placeholder="dd/mm/yyyy" type="date">'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
          '<div class="form-group">'+
            '<label class="control-label label-form-decora">Número Dosis</label>'+
            '<div class="input-group">'+
              '<div class="input-group-addon"><i class="ti-face-smile"></i></div>'+				
              '<select id="swal-input2" class="form-control custom-select">'+
                '<option value="2">2da Dosis</option>'+
                '<option value="3">3ra Dosis</option>'+
                '<option value="4">4ta Dosis</option>'+
              '</select>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="col-md-12">'+
          '<div class="form-group">'+
            '<label class="control-label label-form-decora">Farmaceutica</label>'+
            '<div class="input-group">'+
              '<div class="input-group-addon"><i class="ti-heart"></i></div>'+
              '<select id="swal-input3" class="form-control custom-select">'+
                '<option value="">--Seleccione una opción--</option>'+
                '<option value="Pfizer">Pfizer</option>'+
                '<option value="Moderna">Moderna</option>'+
                '<option value="Sinovac">Sinovac</option>'+
                '<option value="Astrazeneca">Astrazeneca</option>'+
                '<option value="Jansen">Jansen</option>'+
              '</select>'+
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
        this.vacunadosService.crearRegistroDosis(vacunado, formValues[0], formValues[1], formValues[2])
        .subscribe (resp => {
          if(resp.status){
            Swal.fire('Correcto!', resp.msg, 'success');
          } else { 
            Swal.fire('Error!', resp.msg, 'error');
          }
          this.cargarVacunados();
        });
      } else {
        Swal.fire('Error!', 'Debes proveer una fecha de dosis aplicada', 'error');
      }
    }
  }
  
  /**
   * 
   * @param vacunado 
   */
  eliminarRegVacunado ( vacunado: Vacunado ) {
    Swal.fire({
      title: '<small>Esta seguro de eliminar la transacción </br>' + vacunado._id + '?</small>',
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
      if (result.isConfirmed) {
        this.vacunadosService.eliminarRegVacunado( vacunado )
          .subscribe (resp => {
            Swal.fire(
              'Correcto!',
              'El registro ha sido eliminado exitosamente.',
              'success'
            );
            this.cargarVacunados();
          });
      }
    });
  }

}
