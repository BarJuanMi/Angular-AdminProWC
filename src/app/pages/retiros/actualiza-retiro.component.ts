import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Retiro } from 'src/app/models/retiro.model';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadPdfService } from 'src/app/services/file-upload-pdf.service';
import { RetirosService } from 'src/app/services/retiros.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualiza-retiro',
  templateUrl: './actualiza-retiro.component.html',
  styles: [
  ]
})
export class ActualizaRetiroComponent implements OnInit {

  public retiroForm: FormGroup;
  public usuario: Usuario;
  public pdfSubir: File;
  retiroActualizar: Retiro = new Retiro('','','',null,'','',false,false,'',null);
  id: string = '';

  constructor( private fb: FormBuilder, 
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private retiroService: RetirosService,
    private fileUploadPdfService: FileUploadPdfService ) {

    this.usuario = usuarioService.usuario;

    activatedRoute.params.subscribe( params => {
      this.id = params['id'];
      this.cargarRetiroPorID(this.id);
      });
  }

  ngOnInit(): void {
    this.retiroForm = this.fb.group({
      fechaFirma: [this.retiroActualizar.fechaFirma],
      estado: [this.retiroActualizar.estado]
    });
  }
  
  /**
   * Metodo que permite cargar la informacion de un modelo a traves
   * del id que le identifica en la coleccion de la base de datos .
   */
   cargarRetiroPorID(id: string) {
    this.retiroService.buscarRetiroPorId( id ).subscribe( retiro => {
      this.retiroActualizar = retiro;
    });
  }

  /**
   * 
   */
   actualizarRetiro( forma: NgForm) {
    this.retiroService.actualizarRetiro( this.retiroActualizar )
      .subscribe( resp => {
        Swal.fire('Guardado', 'Cambios guardados satisfactoriamente', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  cargarPDFRetiro(file: File ) {
    this.pdfSubir = file;
    const reader = new FileReader();

    reader.readAsDataURL( file );
    
    reader.onloadend = () => {
      reader.result;
    }
  }

  /**
   * 
   */
   subirPDFPazYSalvo() {
      this.fileUploadPdfService
          .actualizarPDF(this.pdfSubir, 'pazysalvos', this.id)
          .then(resp => {
            Swal.fire('Guardado', 'Documento de paz y salvo cargado satisfactoriamente.', 'success');
          }, (err) => {
            console.log(err);
            Swal.fire('Error', 'No se pudo cargar el documento de paz y salvo.', 'error');
          });
    }

}
