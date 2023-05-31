import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/models/contrato.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ContratosService } from 'src/app/services/contratos.service';
import { FileUploadPdfService } from 'src/app/services/file-upload-pdf.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FileUploadZipService } from 'src/app/services/file-upload-zip.service';

const path_general_upload_file = environment.base_url;
const url_load_pdf_contrato = environment.url_load_pdf_contrato;
const url_load_zip_contrato = environment.url_load_zip_contrato;

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styles: [
  ]
})
export class ContratosComponent implements OnInit {

  public totalContratos: number = 0;
  public contratos: Contrato[] = [];
  public contratosTemp: Contrato[] = [];
  public cargando: boolean = true;
  public desde: number = 0;
  public mostrarBotones: boolean = true;
  public usuario: Usuario;
  public contratoDetalle = new Contrato('', null, '', '', new Usuario('', '', null, '', '', '', false, '', '', ''),
    new Date(),null, new Date(), new Date(), '', new Date(),
    new Usuario('', '', null, '', '', '', false, '', '', ''), '', false, '', '',
    new Date(),new Usuario('', '', null, '', '', '', false, '', '', ''), '', false, '', '','');

  constructor(private contratosService: ContratosService,
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private fileUploadPdfService: FileUploadPdfService,
    private fileUploadZipService: FileUploadZipService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.cargarContratos();
  }

  /**
   * Metodo que permite cargar todos los memorandos que se encuentran asociados en la aplicacion.
   */
  cargarContratos() {
    this.cargando = true;
    this.contratosService.cargarContratosDesde(this.desde).pipe(delay(100)).subscribe(({ total, contratos }) => {
      this.totalContratos = total;
      this.contratos = contratos;
      this.contratosTemp = contratos;
      this.cargando = false;
    });
  }

  /**
   * Metodo que permite abstraer los datos de un contrato el cual es seleccionado
   * en la vista principal por la grilla de memorandos.
   * @param contrato Objeto tipo contrato a quien se le consultara la informacion
   */
  verDetallesContrato(contrato: Contrato) {
    this.contratosService.buscarContratoPorId(contrato._id).subscribe(contratoRet => {
      this.contratoDetalle = contratoRet;
      if (this.contratoDetalle.pathPDF !== undefined) {
        this.contratoDetalle.pathPDFNoExt = contrato.pathPDF.split(".")[0];
        this.contratoDetalle.rutaCargueCompletaPDF = path_general_upload_file + url_load_pdf_contrato + this.contratoDetalle.pathPDFNoExt;
        this.contratoDetalle.pathZIPNoExt = contrato.pathDocsZIP.split(".")[0];
        this.contratoDetalle.rutaCargueCompletaZIP = path_general_upload_file + url_load_zip_contrato + this.contratoDetalle.pathZIPNoExt;
      }
    });
  }

  /**
   * Metodo que permite buscar un contrato por el nombre del empleado al que esta asociado
   * @param termino palabra o conjunto de letras
   * @returns lista de memorandos que caen en el filtro
   */
  buscarContratosPorNombreEmp(termino: string) {
    // Mientras escribe las letras para la busqueda, se esconden los botones
    this.mostrarBotones = false;

    if (termino.length === 0) {
      // Si ya no hay letras para la busqueda, aparecen los botones de nuevo
      this.mostrarBotones = true;
      return this.contratos = this.contratosTemp;
    }

    this.busquedasService.buscarPorColeccion('contratos', termino)
      .subscribe((resultados: Contrato[]) => {
        this.contratos = resultados;
      });
  }

  /**
   * Metodo que permite eliminar un registro de contrato
   * @param contrato Objeto tipo contrato que sera eliminado
   */
  eliminarContrato(contrato: Contrato) {
    if(this.usuario.role != 'ADMIN_ROLE'){
      Swal.fire('Error', 'No es posible eliminar la transacción, no tienes los privilegios suficientes.', 'error');
      this.cargarContratos();
    } else {
      Swal.fire({
        title: '<small>Esta seguro de eliminar la transacción </br>' + contrato._id + '?</small>',
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
          this.contratosService.eliminarContrato( contrato )
            .subscribe (resp => {
              Swal.fire(
                'Correcto!',
                'La transacción ha sido realizada exitosamente.',
                'success'
              );
              this.cargarContratos();
            });
        }
      });
    }
  }

  /**
   * Metodo que permite mostrar un modal para el cargue del archivo pdf que sirve de soporte
   * al contrato presentado.
   * @param contrato Objeto tipo contrato al que sera asociado el archivo de soporte
   */
  async mostrarSweetAlertCarguePDF(contrato: Contrato) {
    const { value: file } = await Swal.fire({
      title: '<h3>Seleccione archivo del contrato firmado y digitalizado</h3>',
      input: 'file',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText:'<i class="fa fa-thumbs-down"></i> Cancelar',
      inputAttributes: {
        'accept': 'pdf/*',
        'aria-label': 'Cargue su archivo de contrato'
      }
    })
    
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.fileUploadPdfService
          .actualizarPDF(file, 'contratos', contrato._id)
          .then(resp => {
            if(resp !== undefined) {
              this.contratosService.cargarContratosDesde(this.desde).pipe(delay(50)).subscribe(({ total, contratos }) => {
                this.cargarContratos();
              });
              Swal.fire('Guardado', 'Documento de contrato cargado satisfactoriamente.', 'success');
            } else {
              Swal.fire('Error', 'No se pudo cargar el documento de contrato. Recuerda que debe ser en formato PDF.', 'error');
            }
          }, (error) => {
            console.log('error: ' + error);
            Swal.fire('Error', 'No se pudo cargar el documento de contrato.', 'error');
          });
      }
      reader.readAsDataURL(file)
    }
  }

  /**
   * Metodo que permite mostrar un modal para el cargue del archivo pdf que sirve de soporte
   * al contrato presentado.
   * @param contrato Objeto tipo contrato al que sera asociado el archivo de soporte
   */
  async mostrarSweetAlertCargueZIP(contrato: Contrato) {
    const { value: file } = await Swal.fire({
      title: '<h3>Seleccione archivo comprimido con los documentos de contratación</h3>',
      input: 'file',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText:'<i class="fa fa-thumbs-down"></i> Cancelar',
      inputAttributes: {
        'accept': 'pdf/*',
        'aria-label': 'Cargue su archivo comprimido'
      }
    })
    
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.fileUploadZipService
          .actualizarZIP(file, 'contratos', contrato._id)
          .then(resp => {
            if(resp !== undefined) {
              this.contratosService.cargarContratosDesde(this.desde).pipe(delay(50)).subscribe(({ total, contratos }) => {
                console.log('$$$$' + JSON.stringify(contratos));
                this.cargarContratos();
              });
              Swal.fire('Guardado', 'Documento de soporte para contrato cargado satisfactoriamente.', 'success');
            } else {
              Swal.fire('Error', 'No se pudo cargar el documento de soporte para contrato. Recuerda que debe ser en formato PDF.', 'error');
            }
          }, (error) => {
            console.log('error: ' + error);
            Swal.fire('Error', 'No se pudo cargar el documento de soporte para contrato.', 'error');
          });
      }
      reader.readAsDataURL(file)
    }
  }

  /**
   * Metodo que permite responder y actualizar la solicitud de memorando por un usuario administrador
   * que aceptara o rechazara la solicitud
   * @param ausentismo Objeto tipo ausentismo que sera actualizado
   */
  cambiarEstadoContrato = async( contrato: Contrato ) => {
    const { value: formValues } = await Swal.fire({
      title: '<h3><p style="color:#745af2">Cambio de estado y detalles del cambio en el contrato.</p></h3>',
      html:
      '<div class="col-md-12">'+
        '<div class="form-group">'+
          '<label class="control-label label-form-decora">Nuevo estado del contrato</label>'+
          '<div class="input-group">'+
            '<div class="input-group-addon"><i class="ti-face-smile"></i></div>'+				
            '<select id="swal-input1" class="form-control custom-select">'+
              '<option value="SUSPENDIDO POR TRABAJADOR">SUSPENDIDO POR EMPLEADO</option>'+
              '<option value="FINALIZADO POR TRABAJADOR">FINALIZADO POR EMPLEADO</option>'+
              '<option value="SUSPENDIDO POR EMPLEADOR">SUSPENDIDO POR EMPLEADOR</option>'+
              '<option value="FINALIZADO POR EMPLEADOR">FINALIZADO POR EMPLEADOR</option>'+
            '</select>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="col-md-12">'+
        '<div class="form-group">'+
          '<label class="control-label label-form-decora">Detalle de cambio de estado anticipado</label>'+
          '<div class="input-group">'+
            '<div class="input-group-addon"><i class="ti-heart"></i></div>'+
            '<textarea rows="8" id="swal-input2" class="form-control text-area" placeholder="Detalla minuciosamente ' +
            'las razones por las cuales se da un cambio en el estado del contrato."></textarea>'+
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

    console.log(formValues[0]);
    console.log(formValues[1]);
    if (formValues) {
      if(formValues[0] !== '') {
        this.contratosService.actualizarContrato(contrato, formValues[0], formValues[1])
          .subscribe (resp => {
            if(resp.status){
              Swal.fire('Actualización Correcta!', resp.msg, 'success');
            } else { 
              Swal.fire('Error durante la actualización!', resp.msg, 'error');
            }
            this.cargarContratos();
          });  
      }
    }  
  }

  /**
   * Metodo que permite paginar las transacciones de tipo servicio de lavanderia en el front
   * @param valor 
   */
  cambiarPagina( valor: number) {
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    } else if (this.desde >= this.totalContratos) {
      this.desde -=  valor;
    }
    this.cargarContratos();
  }

}
