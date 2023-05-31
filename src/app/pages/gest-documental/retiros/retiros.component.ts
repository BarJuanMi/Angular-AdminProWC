import { Component, OnInit } from '@angular/core';
import { Retiro } from 'src/app/models/retiro.model';
import { Usuario } from 'src/app/models/usuario.model';
import { RetirosService } from 'src/app/services/retiros.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { FileUploadPdfService } from 'src/app/services/file-upload-pdf.service';
import { CausalRetiro } from 'src/app/models/causalesretiro.model';

const path_general_upload_file = environment.base_url;
const url_load_pdf_pys = environment.url_load_pdf_pazysalvo;

@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styles: [
  ]
})
export class RetirosComponent implements OnInit {

  public totalRetiros: number = 0;
  public retiros: Retiro[] = [];
  public retirosTemp: Retiro[] = [];
  public cargando: boolean = true;
  public desde: number = 0;
  public mostrarBotones: boolean = true;
  public retiroDetalle = new Retiro('',null,'','',null,null,'','',false,false,new CausalRetiro('','',''),null,null,'','',false);
  public usuario: Usuario;

  constructor(private retiroService: RetirosService,
              private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private fileUploadPdfService: FileUploadPdfService) 
  { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.cargarRetiros();
  }

  /**
   * Metodo que permite cargar todos los prestamos que se encuentran asociados en la aplicacion.
   */
   cargarRetiros() {
    this.cargando = true;
    this.retiroService.cargarRetirosDesde(this.desde).pipe(delay(100)).subscribe( ({ total, retiros}) => {
      this.totalRetiros = total;
      this.retiros = retiros;
      this.retirosTemp = retiros;
      this.cargando = false;
    });
  }

  /**
   * Metodo que permite abstraer los datos de un prestamo el cual es seleccionado
   * en la vista principal por la grilla de prestamos.
   * @param retiro Objeto tipo prestamo a quien se le consultara la informacion
   */
   verDetallesRetiro(retiro: Retiro) {
    this.retiroService.buscarRetiroPorId( retiro._id ).subscribe( retiroRet => {
      this.retiroDetalle = retiroRet;
      if(this.retiroDetalle.pathPDF !== undefined){
        this.retiroDetalle.pathPDFNoExt = retiro.pathPDF.split(".")[0];
        this.retiroDetalle.rutaCargueCompletaPDF = path_general_upload_file + url_load_pdf_pys + this.retiroDetalle.pathPDFNoExt;
      }
    });
  }

  /**
   * Metodo que permite buscar un ausentismo por el nombre del empleado al que esta asociado
   * @param termino palabra o conjunto de letras
   * @returns lista de retiros que caen en el filtro
   */
   buscarRetirosPorNombreEmp( termino: string) {
    // Mientras escribe las letras para la busqueda, se esconden los botones
    this.mostrarBotones = false;

    if ( termino.length === 0) {
      // Si ya no hay letras para la busqueda, aparecen los botones de nuevo
      this.mostrarBotones = true;
      return this.retiros = this.retirosTemp;
    }

    this.busquedasService.buscarPorColeccion( 'retiros', termino)
        .subscribe( (resultados: Retiro[]) => {
          this.retiros = resultados;
        });
  }

  /**
   * Metodo que permite paginar las transacciones de tipo retiro en el front
   * @param valor 
   */
   cambiarPagina( valor: number) {
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    } else if (this.desde >= this.totalRetiros) {
      this.desde -=  valor;
    }
    this.cargarRetiros();
  }

  /**
   * Metodo que permite eliminar un registro de retiro
   * @param retiro Objeto tipo retiro que sera eliminado
   */
   eliminarRetiro(retiro: Retiro) {
    if(this.usuario.role != 'ADMIN_ROLE'){
      Swal.fire('Error', 'No es posible eliminar la transacción, no tienes los privilegios suficientes.', 'error');
      this.cargarRetiros();
    } else {
      Swal.fire({
        title: '<small>Esta seguro de eliminar la transacción </br>' + retiro._id + '?</small>',
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
          this.retiroService.eliminarRetiro( retiro )
            .subscribe (resp => {
              Swal.fire(
                'Correcto!',
                'El registro ha sido eliminado exitosamente.',
                'success'
              );
              this.cargarRetiros();
            });
        }
      });
    }
  }

  /**
   * Metodo que permite responder y actualizar la solicitud de paz y salvo por un usuario administrador
   * que aceptara o rechazara la solicitud
   * @param retiro Objeto tipo retiro que sera actualizado
   */
  cambiarEstadoRetiro = async( retiro: Retiro ) => {
    if(!retiro.estadoCargoPDF) {
      Swal.fire('¡No es posible cambiar el estado del retiro si aún no tiene el soporte de paz y salvo cargado!', '', 'error');
    } else {
      if(retiro.estado != 'FIRMADO') {
        const { value: formValues } = await Swal.fire({
          title: '<h3><p style="color:#745af2">Cambio de estado y detalles para la transacción de retiro.</p></h3>',
          html:
          '<div class="col-md-12">'+
            '<div class="form-group">'+
              '<label class="control-label label-form-decora">Estado del Retiro</label>'+
              '<div class="input-group">'+
                '<div class="input-group-addon"><i class="ti-face-smile"></i></div>'+				
                '<select id="swal-input1" class="form-control custom-select">'+
                  '<option value="FIRMADO">FIRMADO</option>'+
                '</select>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="col-md-12">'+
            '<div class="form-group">'+
              '<label class="control-label label-form-decora">Fecha de Firma del Paz y Salvo</label>'+
              '<div class="input-group">'+
                '<div class="input-group-addon"><i class="ti-heart"></i></div>'+
                '<input type="date" id="swal-input2" class="form-control" placeholder="dd/mm/yyyy" autocomplete="off">'+
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
            ]
          }
        })
    
        if (formValues) {
          if(formValues[1] !== '') {
            this.retiroService.actualizarRetiro(retiro, formValues[0], formValues[1])
              .subscribe (resp => {
                if(resp.status){
                  Swal.fire('Actualización Correcta!', resp.msg, 'success');
                } else { 
                  Swal.fire('Error durante la actualización!', resp.msg, 'error');
                }
                this.cargarRetiros();
              });
          }
        }  
      } else {
        Swal.fire('Error!', 'Aún no se encuentra cargado el soporte del retiro.', 'error');
      }
    }
  }

  /**
   * Metodo que permite mostrar un modal para el cargue del archivo pdf que sirve de soporte
   * al retiro presentado.
   * @param retiro Objeto tipo retiro al que sera asociado el archivo de soporte
   */
  async mostrarSweetAlertCargue(retiro: Retiro) {
    let evalResp = undefined;

    const { value: file } = await Swal.fire({
      title: '<h3>Seleccione archivo de paz y salvo</h3>',
      input: 'file',
      focusConfirm: true,
      showCancelButton: true,
      showCloseButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!',
      cancelButtonText:'<i class="fa fa-thumbs-down"></i> Cancelar',
      inputAttributes: {
        'accept': 'pdf/*',
        'aria-label': 'Cargue su archivo de soporte'
      }
    })
    
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.fileUploadPdfService
          .actualizarPDF(file, 'pazysalvos', retiro._id)
          .then(resp => {
            evalResp = resp;
            if(evalResp !== undefined) {
              this.retiroService.actualizarRetiro(retiro, 'GENERADO', '').subscribe (resp => {
                this.cargarRetiros();
              });
              Swal.fire('Guardado', 'Documento de soporte para paz y salvo cargado satisfactoriamente.', 'success');
            } else {
              Swal.fire('Error', 'No se pudo cargar el documento de soporte para paz y salvo. Recuerda que debe ser en formato PDF.', 'error');
            }
          }, (error) => {
            Swal.fire('Error', 'No se pudo cargar el documento de soporte para paz y salvo.', 'error');
          });
      }
      reader.readAsDataURL(file)
      
      this.cargarRetiros();
    }
  }
}
