import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder, 
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) {

    this.usuario = usuarioService.usuario;
    console.log(this.usuario);
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre,  Validators.required],
      email: [this.usuario.email]
    });
  }
  
  /**
   * 
   */
  actualizarProfile() {
    this.usuarioService.actualizarPerfilUsuario( this.profileForm.value )
      .subscribe( resp => {

        const { nombre, email} = this.profileForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios guardados satisfactoriamente', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
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
    this.fileUploadService
        .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
        .then(img => {
          this.usuario.img = img;
          Swal.fire('Guardado', 'Imagen de avatar actualizada satisfactoriamente.', 'success');
        }, (err) => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen de avatar', 'error');
        });
  }

}
