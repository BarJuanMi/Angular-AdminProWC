import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService,
              public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  /**
   * 
   * @param file 
   * @returns 
   */
   cambiarImagenProfile(file: File ) {
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
   subirImagenProfile() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
        .actualizarFoto(this.imagenSubir, tipo, id)
        .then(img => {
          Swal.fire('Guardado', 'Imagen de avatar actualizada satisfactoriamente.', 'success');
          this.modalImagenService.nuevaImagen.emit(img);
          this.cerrarModal();
        }, (err) => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen de avatar', 'error');
        });
  }



}
