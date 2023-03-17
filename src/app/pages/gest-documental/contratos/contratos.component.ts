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

const path_general_upload_file = environment.base_url;
const url_load_pdf_contrato = environment.url_load_pdf_memorando;

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
    new Date(), '', new Date(), new Date(), '', new Date(),
    new Usuario('', '', null, '', '', '', false, '', '', ''), '', false, '', '');

  constructor(private contratosService: ContratosService,
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private fileUploadPdfService: FileUploadPdfService) {
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

}
