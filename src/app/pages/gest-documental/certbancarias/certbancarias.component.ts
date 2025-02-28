import { Component, OnInit } from '@angular/core';
import { CertificacionBancaria } from 'src/app/models/certbancaria.model';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CertbancariasService } from 'src/app/services/certbancarias.service';
import { FileUploadPdfService } from 'src/app/services/file-upload-pdf.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-certbancarias',
  templateUrl: './certbancarias.component.html',
  styles: [
  ]
})
export class CertbancariasComponent implements OnInit {

  public totalCertBancarias: number = 0;
  public certbancarias: CertificacionBancaria[] = [];
  public certbancariasTemp: CertificacionBancaria[] = [];
  public cargando: boolean = true;
  public desde: number = 0;
  public mostrarBotones: boolean = true;
  public usuario: Usuario;

  constructor(private certBancariasService: CertbancariasService,
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private fileUploadPdfService: FileUploadPdfService)
  { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.cargarCertificacionesBancarias();
  }

  /**
   * Metodo que permite cargar todas las certificaciones bancarias que se encuentran asociados en la aplicacion.
   */
  cargarCertificacionesBancarias() {
    this.cargando = true;
    this.certBancariasService.cargarCertificacionesBancariasDesde(this.desde).subscribe( ({ total, certbancarias}) => {
      this.totalCertBancarias = total;
      this.certbancarias = certbancarias;
      this.certbancariasTemp = certbancarias;
      this.cargando = false;

      console.log(JSON.stringify(this.certbancarias));
    });
  }

  /**
   * Metodo que permite buscar una certifricacion bancca por el nombre del empleado al que esta asociado
   * @param termino palabra o conjunto de letras
   * @returns lista de memorandos que caen en el filtro
   */
  buscarCertificacionesPorNombreEmp(termino: string) {
    // Mientras escribe las letras para la busqueda, se esconden los botones
    this.mostrarBotones = false;

    if (termino.length === 0) {
      // Si ya no hay letras para la busqueda, aparecen los botones de nuevo
      this.mostrarBotones = true;
      return this.certbancarias = this.certbancariasTemp;
    }

    this.busquedasService.buscarPorColeccion('certbancarias', termino)
      .subscribe((resultados: CertificacionBancaria[]) => {
        this.certbancarias = resultados;
      });
  }

  /**
   * Metodo que permite mostrar un modal para el cargue del archivo pdf que sirve de soporte
   * al certificado bancario presentado.
   * @param certBancaria Objeto tipo certificado bancario al que sera asociado el archivo de soporte
   */
  async mostrarSweetAlertCarguePDF(certBancaria: CertificacionBancaria) {
    const { value: file } = await Swal.fire({
      title: '<h3>Seleccione y cargue archivo (PDF) de la certificacion emitida por el banco.</h3>',
      input: 'file',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText:'<i class="fa fa-thumbs-down"></i> Cancelar',
      inputAttributes: {
        'accept': 'pdf/*',
        'aria-label': 'Cargue su archivo de certificación bancaria'
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
          .actualizarPDF(file, 'certbancarias', certBancaria._id)
          .then(resp => {
            if(resp !== undefined) {
              this.certBancariasService.cargarCertificacionesBancariasDesde(this.desde).pipe(delay(50)).subscribe(({ total, certbancarias }) => {
                this.cargarCertificacionesBancarias();
              });
              Swal.fire('Guardado', 'Documento de certificación bancaria cargado satisfactoriamente.', 'success');
            } else {
              Swal.fire('Error', 'No se pudo cargar el documento de certificación bancaria. Recuerda que debe ser en formato PDF.', 'error');
            }
          }, (error) => {
            console.log('error: ' + error);
            Swal.fire('Error', 'No se pudo cargar el documento de certificación bancaria.', 'error');
          });
      }
      reader.readAsDataURL(file)
    }
  }

  /**
     * Metodo que permite eliminar un registro de certificacion bancaria
     * @param certBancaria Objeto tipo certBancaria que sera eliminado
     */
    eliminarCertificacionBancaria(certBancaria: CertificacionBancaria) {
      Swal.fire({
        title: '<small>Esta seguro de eliminar la certificación bancaria </br>' + certBancaria._id + '?</small>',
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
          this.certBancariasService.eliminarCertificacion( certBancaria )
            .subscribe (resp => {
              Swal.fire(
                'Correcto!',
                'La certificación bancaria ha sido eliminada exitosamente.',
                'success'
              );
              this.cargarCertificacionesBancarias();
            });
        }
      });
    }

  /**
   * Metodo que permite paginar las transacciones de las certificaciones bancarias en el front
   * @param valor 
   */
  cambiarPagina( valor: number) {
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    } else if (this.desde >= this.totalCertBancarias) {
      this.desde -=  valor;
    }

    this.cargarCertificacionesBancarias();
  }

}
