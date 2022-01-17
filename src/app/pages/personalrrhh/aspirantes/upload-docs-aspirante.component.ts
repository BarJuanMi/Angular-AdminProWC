import { Component, OnInit } from '@angular/core';
import { FileUploadPdfService } from 'src/app/services/file-upload-pdf.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-docs-aspirante',
  templateUrl: './upload-docs-aspirante.component.html',
  styles: [
  ]
})
export class UploadDocsAspiranteComponent implements OnInit {

  public pdfHVSubir: File;
  public pdfResPsicoSubir: File;
  id: string = '';

  constructor(
    private fileUploadPdfService: FileUploadPdfService,
    private activatedRoute: ActivatedRoute,
  ) { 

    activatedRoute.params.subscribe( params => {
      this.id = params['id'];
      });
  }

  ngOnInit(): void {
  }


  /**
   * 
   * @param file 
   */
   cargarPDFHojaVida(file: File ) {
    this.pdfHVSubir = file;
    const reader = new FileReader();

    reader.readAsDataURL( file );
    
    reader.onloadend = () => {
      reader.result;
    }
  }

  /**
   * 
   * @param file 
   */
   cargarPDFResPsico(file: File ) {
    this.pdfResPsicoSubir = file;
    const reader = new FileReader();

    reader.readAsDataURL( file );
    
    reader.onloadend = () => {
      reader.result;
    }
  }

  /**
   * 
   */
   subirPDFHojaVida() {
    this.fileUploadPdfService
        .actualizarPDF(this.pdfHVSubir, 'hojasvida', this.id)
        .then(resp => {
          Swal.fire('Guardado', 'Documento de Hoja de vida cargado satisfactoriamente.', 'success');
        }, (err) => {
          console.log(err);
          Swal.fire('Error', 'No se pudo cargar la hoja de vida.', 'error');
        });
  }

  /**
   * 
   */
   subirPDFResPsico() {
    this.fileUploadPdfService
        .actualizarPDF(this.pdfHVSubir, 'respsicologico', this.id)
        .then(resp => {
          Swal.fire('Guardado', 'Resultado de prueba psicotécnica cargado satisfactoriamente.', 'success');
        }, (err) => {
          console.log(err);
          Swal.fire('Error', 'No se pudo cargar la hoja de vida.', 'error');
        });
  }

}
