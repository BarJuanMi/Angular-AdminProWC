import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: [
  ]
})
export class NuevoUsuarioComponent implements OnInit {

  public usuarioAppForm: FormGroup;
  public usuario: Usuario;
  public usuarioCreador: Usuario;

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,) 
    {
      this.usuarioCreador = usuarioService.usuario;
      this.usuario = new Usuario('','',null,'','','',false,'','');
    }

  ngOnInit(): void {
    this.usuarioAppForm = this.fb.group({
      nombre: [this.usuario.nombre],
      email: [this.usuario.email],
      role: [this.usuario.role],
      usuarioNombre: [this.usuarioCreador.nombre],
      password: [this.usuario.password]
    });
  }

  crearNuevoUsuarioApp() {
    this.usuarioService.crearNuevoUsuarioApp( this.usuarioAppForm.value )
    .subscribe( resp => {
      // Navegar al dashboard
      this.router.navigateByUrl('/dashboard/usuarios');

      Swal.fire('Guardado', 'Usuario Creado Satisfactoriamente', 'success');
    }, ( err ) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
