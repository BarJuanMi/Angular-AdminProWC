import { Component, OnInit } from '@angular/core';
import { Retiro } from 'src/app/models/retiro.model';
import { Usuario } from 'src/app/models/usuario.model';
import { RetirosService } from 'src/app/services/retiros.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileObtainPdfService } from 'src/app/services/file-obtain-pdf.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';

const path_back = environment.base_url;
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
  public retiroDetalle = new Retiro("",null,"",null,null,"","",false,false,null,null,'','',false);
  public usuario: Usuario;

  constructor(private retiroService: RetirosService,
              private usuarioService: UsuarioService,
              private fileObtainPDFService: FileObtainPdfService) 
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
        this.retiroDetalle.rutaCargueCompletaPDF = url_load_pdf_pys + this.retiroDetalle.pathPDFNoExt;
      }
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
   * 
   * @param prestamo 
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
                'La transacción ha sido realizada exitosamente.',
                'success'
              );
              this.cargarRetiros();
            });
        }
      });
    }
  }
}
