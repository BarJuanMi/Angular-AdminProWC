import { Component, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/models/ciudad.util.model';
import { Factura } from 'src/app/models/factura.model';
import { Localidad } from 'src/app/models/localidad.util.model';
import { Sede } from 'src/app/models/sede.util.model';
import { TipoCompraFactura } from 'src/app/models/tipocomprafactura.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { FileUploadPdfService } from 'src/app/services/file-upload-pdf.service';
import { FileUploadZipService } from 'src/app/services/file-upload-zip.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

const path_general_upload_file = environment.base_url;
const url_load_zip_factura = environment.url_load_zip_factura;

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: [
  ]
})
export class FacturasComponent implements OnInit {

  public totalFacturas: number = 0;
  public facturas: Factura[] = [];
  public facturasTemp: Factura[] = [];
  public cargando: boolean = true;
  public desde: number = 0;
  public mostrarBotones: boolean = true;
  public facturaDetalle: Factura = new Factura('',new Date(),0,false,new TipoCompraFactura('','',''),'',
    new Usuario('', '', null, '', '', '', false, '', '', ''),new Sede('','',0,0,'',new Ciudad('','',''),
    new Localidad('','','')),new Date(),'',false,new Usuario('', '', null, '', '', '', false, '', '', ''),
    new Date(),new Usuario('', '', null, '', '', '', false, '', '', ''),'',false,'','');
  
  public usuario: Usuario;

  constructor(private facturasService: FacturasService,
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private fileUploadZipService: FileUploadZipService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.cargarFacturas();
  }

  /**
   * Metodo que permite cargar todos las facturas que se encuentran asociados en la aplicacion.
   */
  cargarFacturas() {
    this.cargando = true;
    this.facturasService.cargarFacturasDesde(this.desde).pipe(delay(100)).subscribe(({ total, facturas }) => {
      this.totalFacturas = total;
      this.facturas = facturas;
      this.facturasTemp = facturas;
      this.cargando = false;
    });
  }

  /**
   * Metodo que permite abstraer los datos de un factura el cual es seleccionado
   * en la vista principal por la grilla de memorandos.
   * @param factura Objeto tipo factura a quien se le consultara la informacion
   */
  verDetallesFactura(factura: Factura) {
    this.facturasService.buscarFacturaPorId(factura._id).subscribe(facturaRet => {
      this.facturaDetalle = facturaRet;
      if (this.facturaDetalle.pathDocsZIP !== undefined) {
        this.facturaDetalle.pathZIPNoExt = factura.pathDocsZIP.split(".")[0];
        this.facturaDetalle.rutaCargueCompletaZIP = path_general_upload_file + url_load_zip_factura + this.facturaDetalle.pathZIPNoExt;
      }
    });
  }

  /**
   * Metodo que permite eliminar un registro de contrato
   * @param contrato Objeto tipo contrato que sera eliminado
   */
  eliminarFactura(factura: Factura) {
    if(this.usuario.role != 'ADMIN_ROLE' &&  this.usuario.role != 'USER_ROLE'){
      Swal.fire('Error', 'No es posible eliminar la transacción, no tienes los privilegios suficientes.', 'error');
      this.cargarFacturas();
    } else {
      Swal.fire({
        title: '<small>Esta seguro de eliminar la transacción </br>' + factura._id + '?</small>',
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
          this.facturasService.eliminarFactura( factura )
            .subscribe (resp => {
              Swal.fire(
                'Correcto!',
                'La transacción ha sido realizada exitosamente.',
                'success'
              );
              this.cargarFacturas();
            });
        }
      });
    }
  }

  /**
   * Metodo que permite mostrar un modal para el cargue del archivo pdf que sirve de soporte
   * al factura presentado.
   * @param factura Objeto tipo factura al que sera asociado el archivo de soporte
   */
  async mostrarSweetAlertCargueZIP(factura: Factura) {
    const { value: file } = await Swal.fire({
      title: '<h3>Seleccione y cargue archivo comprimido (ZIP, RAR, 7ZIP) con el o los soportes de las facturas</h3>',
      input: 'file',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText:'<i class="fa fa-thumbs-down"></i> Cancelar',
      inputAttributes: {
        'accept': 'pdf/*',
        'aria-label': 'Cargue su archivo comprimido'
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
        this.fileUploadZipService
          .actualizarZIP(file, 'facturas', factura._id)
          .then(resp => {
            if(resp !== undefined) {
              this.facturasService.cargarFacturasDesde(this.desde).pipe(delay(50)).subscribe(({ total, facturas }) => {
                console.log('$$$$' + JSON.stringify(facturas));
                this.cargarFacturas();
              });
              Swal.fire('Guardado', 'Documento de soporte para las factura(s) cargado satisfactoriamente.', 'success');
            } else {
              Swal.fire('Error', 'No se pudo cargar el o los soportes de las factura(s). Recuerda que debe ser en formato ZIP.', 'error');
            }
          }, (error) => {
            console.log('error: ' + error);
            Swal.fire('Error', 'No se pudo cargar el o los soportes de las factura(s).', 'error');
          });
      }
      reader.readAsDataURL(file)
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
    } else if (this.desde >= this.totalFacturas) {
      this.desde -=  valor;
    }
    this.cargarFacturas();
  }

}
