import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Aspirante } from 'src/app/models/aspirante.model';
import { CargoAspirante } from 'src/app/models/cargoaspirante.model';
import { Localidad } from 'src/app/models/localidad.util.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AspirantesService } from 'src/app/services/aspirantes.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const path_general_upload_file = environment.base_url;
const url_load_pdf_hv = environment.url_load_pdf_hojas_vida;
const url_load_pdf_res_psico = environment.url_load_pdf_resp_psico;

@Component({
  selector: 'app-aspirantes',
  templateUrl: './aspirantes.component.html',
  styles: [
  ]
})
export class AspirantesComponent implements OnInit {

  public totalAspirantes: number = 0;
  public aspirantes: Aspirante[] = [];
  public aspirantesTemp: Aspirante[] = [];
  public aspiranteWCDetalle: Aspirante = new Aspirante('','','','','','','','','',new Usuario('','',null,'','','',false,'','',''),
                                                      new CargoAspirante('','',''),'','','',new Localidad('','',''),false,null,null,'',false,'',false,'','');

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public mostrarBotones: boolean = true;

  constructor(private aspirantesService: AspirantesService,
              private busquedasService: BusquedasService,) { }

  ngOnInit(): void {
    this.cargarAspirantes();
  }

  cargarAspirantes() {
    this.cargando = true;
    this.aspirantesService.cargarAspirantesDesde(this.desde).subscribe( ({ total, aspirantes}) => {
      this.totalAspirantes = total;
      this.aspirantes = aspirantes;
      this.aspirantesTemp = aspirantes;
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
    } else if (this.desde >= this.totalAspirantes) {
      this.desde -=  valor;
    }

    this.cargarAspirantes();
  }

  /**
   * 
   * @param termino 
   * @returns 
   */
   buscarAspirantesTermino( termino: string) {
    // Mientras escribe las letras para la busqueda, se esconden los botones
    this.mostrarBotones = false;

    if ( termino.length === 0) {
      // Si ya no hay letras para la busqueda, aparecen los botones de nuevo
      this.mostrarBotones = true;
      return this.aspirantes = this.aspirantesTemp;
    }

    this.busquedasService.buscarPorColeccion( 'aspirantes', termino)
        .subscribe( (resultados: Aspirante[]) => {
          this.aspirantes = resultados;
        });
  }

  /**
   * 
   * @param aspirante 
   */
  verDetallesAspirante( aspirante: Aspirante) {
    this.aspirantesService.buscarAspiranteParticular( aspirante ).subscribe( aspiranteRet => {
      this.aspiranteWCDetalle = aspiranteRet;
      if(this.aspiranteWCDetalle.pathHojaVidaPDF !== undefined){
        this.aspiranteWCDetalle.rutaCargueComplHVPDF = path_general_upload_file + url_load_pdf_hv + aspirante.pathHojaVidaPDF.split(".")[0];
      }

      if(this.aspiranteWCDetalle.pathResultadoPDF !== undefined){
        this.aspiranteWCDetalle.rutaCargueComplResPDF = path_general_upload_file + url_load_pdf_res_psico + aspirante.pathResultadoPDF.split(".")[0];
      }
    });
  }

  /**
   * 
   * @param vacunado 
   */
   cambiarEstadoAspirante = async( aspirante: Aspirante) => {
    const { value: formValues } = await Swal.fire({
      title: '<h3>Cambio de estado para aspirante</h3>',
      html:
      '<div class="row p-t-20">'+
        '<div class="col-md-12">'+
          '<div class="form-group">'+
            '<label class="control-label label-form-decora">Nuevo estado</label>'+
            '<div class="input-group">'+
              '<div class="input-group-addon"><i class="ti-pin-alt"></i></div>'+
              '<select id="swal-input1" class="form-control custom-select">'+
                '<option value="Registrado en App">Registrado en App</option>'+
                '<option value="Aceptado - Contratado">Aceptado - Contratado</option>'+
                '<option value="Aceptado - En espera">Aceptado - En espera</option>'+
                '<option value="Rechazado">Rechazado</option>'+
              '</select>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
        ]
      }
    })

    if (formValues) {
      this.aspirantesService.cambiarEstadoAspirante(aspirante, formValues[0])
      .subscribe (resp => {
        this.cargarAspirantes();
      });
    }
  }

    /**
   * Metodo que permite eliminar un registro de contrato
   * @param contrato Objeto tipo contrato que sera eliminado
   */
    eliminarAspirante(aspirante: Aspirante) {
      Swal.fire({
        title: '<small>Esta seguro de eliminar el aspirante </br>' + aspirante._id + '?</small>',
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
          this.aspirantesService.eliminarAspirante( aspirante )
            .subscribe (resp => {
              Swal.fire(
                'Correcto!',
                'El contrato ha sido eliminado exitosamente.',
                'success'
              );
              this.cargarAspirantes();
            });
        }
      });
    }
}
