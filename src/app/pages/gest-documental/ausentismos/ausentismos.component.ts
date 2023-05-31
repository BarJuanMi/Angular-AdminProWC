import { Component, OnInit } from '@angular/core';
import { Ausentismo } from 'src/app/models/ausentismo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AusentismosService } from 'src/app/services/ausentismos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';
import { FileUploadPdfService } from 'src/app/services/file-upload-pdf.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

const path_general_upload_file = environment.base_url;
const url_load_pdf_ausentismo = environment.url_load_pdf_ausentismo;

@Component({
  selector: 'app-ausentismos',
  templateUrl: './ausentismos.component.html',
  styles: [
  ]
})
export class AusentismosComponent implements OnInit {

  public totalAusentismos: number = 0;
  public ausentismos: Ausentismo[] = [];
  public ausentismosTemp: Ausentismo[] = [];
  public cargando: boolean = true;
  public desde: number = 0;
  public mostrarBotones: boolean = true;
  public ausentismoDetalle = new Ausentismo('',null,'',null,new Date(),new Date(),'',
                                            new Usuario('','',null,'','','',false,'','',''),
                                            new Date(),'',new Date(),new Usuario('','',null,'','','',false,'','',''),
                                            new Date(),new Usuario('','',null,'','','',false,'','',''),'',false,'','');
  public usuario: Usuario;

  constructor(private ausentismosService: AusentismosService,
              private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private fileUploadPdfService: FileUploadPdfService) 
  { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.cargarAusentismos();
  }

  /**
   * Metodo que permite cargar todos los ausentismos que se encuentran asociados en la aplicacion.
   */
   cargarAusentismos() {
    this.cargando = true;
    this.ausentismosService.cargarAusentismosDesde(this.desde).pipe(delay(100)).subscribe( ({ total, ausentismos}) => {
      this.totalAusentismos = total;
      this.ausentismos = ausentismos;
      this.ausentismosTemp = ausentismos;
      this.cargando = false;
    });
  }
  
  /**
   * Metodo que permite abstraer los datos de un ausentismo el cual es seleccionado
   * en la vista principal por la grilla de ausentismos.
   * @param ausentismo Objeto tipo ausentismo a quien se le consultara la informacion
   */
   verDetallesAusentismo(ausentismo: Ausentismo) {
    this.ausentismosService.buscarAusentismoPorId( ausentismo._id ).subscribe( ausentismoRet => {
      this.ausentismoDetalle = ausentismoRet;
      if(this.ausentismoDetalle.pathPDF !== undefined){
        this.ausentismoDetalle.pathPDFNoExt = ausentismo.pathPDF.split(".")[0];
        this.ausentismoDetalle.rutaCargueCompletaPDF = path_general_upload_file + url_load_pdf_ausentismo + this.ausentismoDetalle.pathPDFNoExt;
      }
    });
  }

  /**
   * Metodo que evalua dos estados en particular para un registro de ausentismo
   * @param ausentismoEval Objeto tipo ausentismo a quien se le consultara la informacion
   * @returns true si el estado se encuentra dentro de las opciones
   */
  evaluarEstadoAusentismo(ausentismoEval: Ausentismo) {
    return (ausentismoEval.estado == 'REVISADO Y APROBADO' || ausentismoEval.estado == 'REVISADO Y RECHAZADO')
  }

  /**
   * Metodo que permite mostrar un modal para el cargue del archivo pdf que sirve de soporte
   * al ausentismo presentado.
   * @param ausentismo Objeto tipo ausentismo al que sera asociado el archivo de soporte
   */
  async mostrarSweetAlertCargue(ausentismo: Ausentismo) {
    const { value: file } = await Swal.fire({
      title: '<h3>Seleccione archivo de ausentismo</h3>',
      input: 'file',
      showCancelButton: true,
      cancelButtonColor: '#d33',
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
          .actualizarPDF(file, 'ausentismos', ausentismo._id)
          .then(resp => {
            console.log('resp: ' + resp);

            if(resp !== undefined) {
              Swal.fire('Guardado', 'Documento de soporte para ausencia cargado satisfactoriamente.', 'success');
            } else {
              Swal.fire('Error', 'No se pudo cargar el documento de soporte para ausencia. Recuerda que debe ser en formato PDF.', 'error');
            }
          }, (error) => {
            console.log('error: ' + error);
            Swal.fire('Error', 'No se pudo cargar el documento de soporte para ausencia.', 'error');
          });
      }
      reader.readAsDataURL(file)

      this.ausentismosService.actualizarAusentismo(ausentismo, 'PENDIENTE DE REVISION', 'N/A').subscribe (resp => {
        this.cargarAusentismos();
      });
      this.cargarAusentismos();
    }
  }

  /**
   * Metodo que permite eliminar un registro de ausentismo
   * @param ausentismo Objeto tipo ausentismo que sera eliminado
   */
   eliminarAusentismo(ausentismo: Ausentismo) {
    if(this.usuario.role != 'ADMIN_ROLE'){
      Swal.fire('Error', 'No es posible eliminar la transacción, no tienes los privilegios suficientes.', 'error');
      this.cargarAusentismos();
    } else {
      Swal.fire({
        title: '<small>Esta seguro de eliminar la transacción </br>' + ausentismo._id + '?</small>',
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
          this.ausentismosService.eliminarAusentismo( ausentismo )
            .subscribe (resp => {
              Swal.fire(
                'Correcto!',
                'La transacción ha sido realizada exitosamente.',
                'success'
              );
              this.cargarAusentismos();
            });
        }
      });
    }
  }

  /**
   * Metodo que permite responder y actualizar la solicitud de ausentismo por un usuario administrador
   * que aceptara o rechazara la solicitud
   * @param ausentismo Objeto tipo ausentismo que sera actualizado
   */
  responderSolicitudAusentismo = async( ausentismo: Ausentismo ) => {
    if(ausentismo.estado != 'CREADO SIN SOPORTE') {
      const { value: formValues } = await Swal.fire({
        title: '<h3><p style="color:#745af2">Detalles para responder a la petición de ausentismo o permiso</p></h3>',
        html:
        '<div class="row p-t-20">'+
          '<div class="col-md-6">'+
          '<div class="form-group">'+
          '<label class="control-label label-form-decora">¿Soporte Correcto?</label>'+
          '<div class="input-group">'+
            '<div class="input-group-addon"><i class="ti-face-smile"></i></div>'+				
            '<select id="swal-input1" class="form-control custom-select">'+
              '<option value="SI">SI</option>'+
              '<option value="NO">NO</option>'+
            '</select>'+
          '</div>'+
        '</div>'+
          '</div>'+
          '<div class="col-md-6">'+
            '<div class="form-group">'+
              '<label class="control-label label-form-decora">Estado del permiso</label>'+
              '<div class="input-group">'+
                '<div class="input-group-addon"><i class="ti-face-smile"></i></div>'+				
                '<select id="swal-input2" class="form-control custom-select">'+
                  '<option value="REVISADO Y APROBADO">APROBADO</option>'+
                  '<option value="REVISADO Y RECHAZADO">RECHAZADO</option>'+
                '</select>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="col-md-12">'+
            '<div class="form-group">'+
              '<label class="control-label label-form-decora">Observaciones Adicionales</label>'+
              '<div class="input-group">'+
                '<div class="input-group-addon"><i class="ti-heart"></i></div>'+
                '<textarea id="swal-input3" class="form-control text-area"></textarea>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>',
        focusConfirm: true,
        showCancelButton: true,
        showCloseButton: true,
        cancelButtonColor: '#d33',
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
          this.ausentismosService.actualizarAusentismo(ausentismo, formValues[1], formValues[2])
            .subscribe (resp => {
              if(resp.status){
                Swal.fire('Actualización Correcta!', resp.msg, 'success');
              } else { 
                Swal.fire('Error durante la actualización!', resp.msg, 'error');
              }
              this.cargarAusentismos();
            });  
        }
      }  
    } else {
      Swal.fire('Error!', 'Aún no se encuentra cargado el soporte del permiso.', 'error');
    }
  }

  /**
   * Metodo que permite buscar un ausentismo por el nombre del empleado al que esta asociado
   * @param termino palabra o conjunto de letras
   * @returns lista de ausentismos que caen en el filtro
   */
  buscarAusentismosPorNombreEmp( termino: string) {
    // Mientras escribe las letras para la busqueda, se esconden los botones
    this.mostrarBotones = false;

    if ( termino.length === 0) {
      // Si ya no hay letras para la busqueda, aparecen los botones de nuevo
      this.mostrarBotones = true;
      return this.ausentismos = this.ausentismosTemp;
    }

    this.busquedasService.buscarPorColeccion( 'ausentismos', termino)
        .subscribe( (resultados: Ausentismo[]) => {
          this.ausentismos = resultados;
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
    } else if (this.desde >= this.totalAusentismos) {
      this.desde -=  valor;
    }
    this.cargarAusentismos();
  }
}
