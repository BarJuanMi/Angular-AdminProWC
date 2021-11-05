import { Component, OnInit } from '@angular/core';
import { ModalImageLargeService } from 'src/app/services/modal-image-large.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen-large',
  templateUrl: './modal-imagen-large.component.html',
  styles: [
  ]
})
export class ModalImagenLargeComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(public modalImageLargeService: ModalImageLargeService,
              public fileUploadService: FileUploadService) {}

  ngOnInit(): void {}

  cerrarModalLarge() {
    this.imgTemp = null;
    this.modalImageLargeService.cerrarModalLarge();
  }

  /**
   * 
   * @param file 
   * @returns 
   */
   cambiarImagenRecuadro(file: File ) {
    this.imagenSubir = file;
      
    if (!file ) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );
    
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  /**
   * 
   */
   subirImagenRecuadro() {
    const id = this.modalImageLargeService.id;
    const tipo = this.modalImageLargeService.tipo;

    this.fileUploadService
        .actualizarFoto(this.imagenSubir, tipo, id)
        .then(img => {
          Swal.fire('Guardado', 'Imagen actualizada satisfactoriamente.', 'success');
          this.modalImageLargeService.nuevaImagenLarge.emit(img);
          this.cerrarModalLarge();
        }, (err) => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen a la nube', 'error');
        });
  }

}
