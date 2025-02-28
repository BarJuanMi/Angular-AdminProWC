import { Component, OnInit } from '@angular/core';
import { Memorando } from 'src/app/models/memorando.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { FileUploadPdfService } from 'src/app/services/file-upload-pdf.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { MemorandosService } from 'src/app/services/memorandos.service';

const path_general_upload_file = environment.base_url;
const url_load_pdf_memorando = environment.url_load_pdf_memorando;

@Component({
  selector: 'app-memorandos',
  templateUrl: './memorandos.component.html',
  styles: [
  ]
})
export class MemorandosComponent implements OnInit {

  public totalMemorandos: number = 0;
  public memorandos: Memorando[] = [];
  public memorandosTemp: Memorando[] = [];
  public cargando: boolean = true;
  public desde: number = 0;
  public mostrarBotones: boolean = true;
  public usuario: Usuario;
  public memorandoDetalle = new Memorando('',null,'','',new Usuario('','',null,'','','',false,'','',''),
                                          new Date(),'','','',new Date(),'',new Date(),new Usuario('','',null,'','',
                                          '',false,'','',''),'',false,'','');

  constructor(private memorandosService: MemorandosService,
              private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private fileUploadPdfService: FileUploadPdfService)
  { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.cargarMemorandos();
  }

  /**
   * Metodo que permite cargar todos los memorandos que se encuentran asociados en la aplicacion.
   */
   cargarMemorandos() {
    this.cargando = true;
    this.memorandosService.cargarMemorandosDesde(this.desde).pipe(delay(100)).subscribe( ({ total, memorandos}) => {
      this.totalMemorandos = total;
      this.memorandos = memorandos;
      this.memorandosTemp = memorandos;
      this.cargando = false;
    });
  }

  /**
   * Metodo que permite abstraer los datos de un memorando el cual es seleccionado
   * en la vista principal por la grilla de memorandos.
   * @param memorando Objeto tipo memorando a quien se le consultara la informacion
   */
   verDetallesMemorando(memorando: Memorando) {
    this.memorandosService.buscarMemorandoPorId( memorando._id ).subscribe( memorandoRet => {
      this.memorandoDetalle = memorandoRet;
      if(this.memorandoDetalle.pathPDF !== undefined){
        this.memorandoDetalle.pathPDFNoExt = memorando.pathPDF.split(".")[0];
        this.memorandoDetalle.rutaCargueCompletaPDF = path_general_upload_file + url_load_pdf_memorando + this.memorandoDetalle.pathPDFNoExt;
      }
    });
  }

  /**
   * Metodo que permite eliminar un registro de memorando
   * @param memorando Objeto tipo memorando que sera eliminado
   */
   eliminarMemorando(memorando: Memorando) {
    if(this.usuario.role != 'ADMIN_ROLE' &&  this.usuario.role != 'USER_ROLE'){
      Swal.fire('Error', 'No es posible eliminar la transacción, no tienes los privilegios suficientes.', 'error');
      this.cargarMemorandos();
    } else {
      Swal.fire({
        title: '<small>¿Esta seguro de eliminar la transacción </br>' + memorando._id + '?</small>',
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
          this.memorandosService.eliminarMemorando( memorando )
            .subscribe (resp => {
              Swal.fire(
                'Correcto!',
                'La transacción ha sido realizada exitosamente.',
                'success'
              );
              this.cargarMemorandos();
            });
        }
      });
    }
  }

  /**
   * Metodo que permite responder y actualizar la solicitud de memorando por un usuario administrador
   * que aceptara o rechazara la solicitud
   * @param ausentismo Objeto tipo ausentismo que sera actualizado
   */
   responderSolicitudMemorando = async( memorando: Memorando ) => {
    if(memorando.estado != 'CREADO SIN SOPORTE') {
      const { value: formValues } = await Swal.fire({
        title: '<h3><p style="color:#745af2">Cambio de estado y detalles de respuesta en el memorando.</p></h3>',
        html:
        '<div class="col-md-12">'+
          '<div class="form-group">'+
            '<label class="control-label label-form-decora">Estado del permiso</label>'+
            '<div class="input-group">'+
              '<div class="input-group-addon"><i class="ti-face-smile"></i></div>'+				
              '<select id="swal-input1" class="form-control custom-select">'+
                '<option value="NOTIFICADO Y ACEPTADO">NOTIFICADO Y ACEPTADO</option>'+
                '<option value="NOTIFICADO Y RECHAZADO">NOTIFICADO Y RECHAZADO</option>'+
              '</select>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="col-md-12">'+
          '<div class="form-group">'+
            '<label class="control-label label-form-decora">Detalle de respuesta</label>'+
            '<div class="input-group">'+
              '<div class="input-group-addon"><i class="ti-heart"></i></div>'+
              '<textarea rows="8" id="swal-input2" class="form-control text-area" placeholder="Copia y Pega la respuesta '+
              'del empleado en caso de tenerla... o tu descripción sobre la aceptación o rechazo por parte del empleado."></textarea>'+
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
        if(formValues[0] !== '') {
          this.memorandosService.actualizarMemorando(memorando, formValues[0], formValues[1])
            .subscribe (resp => {
              if(resp.status){
                Swal.fire('Actualización Correcta!', resp.msg, 'success');
              } else { 
                Swal.fire('Error durante la actualización!', resp.msg, 'error');
              }
              this.cargarMemorandos();
            });  
        }
      }  
    } else {
      Swal.fire('Error!', 'Aún no se encuentra cargado el soporte del memorando.', 'error');
    }
  }

  /**
   * Metodo que permite buscar un memorando por el nombre del empleado al que esta asociado
   * @param termino palabra o conjunto de letras
   * @returns lista de memorandos que caen en el filtro
   */
  buscarMemorandosPorNombreEmp( termino: string) {
    // Mientras escribe las letras para la busqueda, se esconden los botones
    this.mostrarBotones = false;

    if ( termino.length === 0) {
      // Si ya no hay letras para la busqueda, aparecen los botones de nuevo
      this.mostrarBotones = true;
      return this.memorandos = this.memorandosTemp;
    }

    this.busquedasService.buscarPorColeccion( 'memorandos', termino)
        .subscribe( (resultados: Memorando[]) => {
          this.memorandos = resultados;
        });
  }

  /**
   * Metodo que permite mostrar un modal para el cargue del archivo pdf que sirve de soporte
   * al memorando presentado.
   * @param memorando Objeto tipo memorando al que sera asociado el archivo de soporte
   */
   async mostrarSweetAlertCargue(memorando: Memorando) {
    let evalResp = undefined;

    const { value: file } = await Swal.fire({
      title: '<h3>Seleccione archivo de memorando</h3>',
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
      },
      backdrop: `
        rgba(0,0,123,0.4)
        url("./assets/images/gifs-swal/cat-nyan-cat.gif")
        left top
        no-repeat
      `
    })
    
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.fileUploadPdfService
          .actualizarPDF(file, 'memorandos', memorando._id)
          .then(resp => {
            evalResp = resp;
            if(evalResp !== undefined) {
              this.memorandosService.actualizarMemorando(memorando, 'CREADO CON SOPORTE', '').subscribe (resp => {
                this.cargarMemorandos();
              });
              Swal.fire('Guardado', 'Documento de soporte para memorando cargado satisfactoriamente.', 'success');
            } else {
              Swal.fire('Error', 'No se pudo cargar el documento de soporte para memorando. Recuerda que debe ser en formato PDF.', 'error');
            }
          }, (error) => {
            Swal.fire('Error', 'No se pudo cargar el documento de soporte para memorando.', 'error');
          });
      }
      reader.readAsDataURL(file)
      
      this.cargarMemorandos();
    }
  }

}
