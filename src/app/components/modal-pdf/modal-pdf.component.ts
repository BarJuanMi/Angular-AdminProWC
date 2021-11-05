import { Component, OnInit } from '@angular/core';
import { FileUploadPdfService } from '../../services/file-upload-pdf.service';
import Swal from 'sweetalert2';
import { ModalPdfService } from 'src/app/services/modal-pdf.service';

@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.component.html',
  styles: [
  ]
})
export class ModalPdfComponent implements OnInit {

  public pdfSubir: File;

  constructor(public modalPDFService: ModalPdfService,
              public fileUploadPDFService: FileUploadPdfService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalPDFService.cerrarModal();
  }

  /**
   * 
   * @param file 
   * @returns 
   */
   cargarPDFSoporte(file: File ) {
    this.pdfSubir = file;

    const reader = new FileReader();
    reader.readAsDataURL( file );
  }

  /**
   * 
   */
   subirPDFSoporte() {
    const id = this.modalPDFService.id;
    const tipo = this.modalPDFService.tipo;

    this.fileUploadPDFService
        .actualizarPDF(this.pdfSubir, tipo, id)
        .then(pdf => {
          Swal.fire('Guardado', 'Archivo cargado satisfactoriamente.', 'success');
          this.modalPDFService.nuevoPDF.emit(pdf);
          this.cerrarModal();
        }, (err) => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir el archivo relacionado', 'error');
        });
  }

}
