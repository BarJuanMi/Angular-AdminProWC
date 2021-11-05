import { Component, OnInit } from '@angular/core';
import { Vacunado } from 'src/app/models/vacunado.model';
import { Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImageLargeService } from 'src/app/services/modal-image-large.service';
import { VacunadosService } from 'src/app/services/vacunas.service';
import { delay } from 'rxjs/operators';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
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
  public vacunadoDetalle: Vacunado = new Vacunado('','','',null,null,null,null,null,'',null,false,'');
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
                '<option value="2daDosis">2da Dosis</option>'+
                '<option value="3raDosis">3ra Dosis</option>'+
                '<option value="4taDosis">4ta Dosis</option>'+
              '</select>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value
        ]
      }
    })

    if (formValues) {
      this.vacunadosService.crearRegistroDosis(vacunado, formValues[0], formValues[1])
      .subscribe (resp => {
        Swal.fire(
          'Correcto!',
          'El registro se ha adicionado exitosamente.',
          'success'
        );
        this.cargarVacunados();
      });
    }
  }
  
  /**
   * 
   * @param vacunado 
   */
  eliminarRegVacunado ( vacunado: Vacunado ) {
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

}
