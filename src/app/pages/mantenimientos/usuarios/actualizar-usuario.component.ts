import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styles: [
  ]
})
export class ActualizarUsuarioComponent implements OnInit {

  public usuarioLogged: Usuario;
  roleActual: string = '';

  usuarioActualizar: Usuario = new Usuario('','',new Date(),'','','',false,'','','');

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.usuarioLogged = usuarioService.usuario;
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      this.cargarUsuario(id);
      });
  }

  ngOnInit(): void {
  }

  /**
   * Metodo que permite cargar la informacion de un modelo a traves
   * del id que le identifica en la coleccion de la base de datos .
   */
   cargarUsuario(id: string) {
      this.usuarioService.buscarUsuarioPorId( id ).subscribe( usuario => {
        this.usuarioActualizar = usuario;
        this.roleActual = this.usuarioActualizar.role;
      
        if(this.usuarioActualizar.estado === 'INACTIVO'){
          this.router.navigateByUrl('/dashboard/usuarios');
          Swal.fire('Error', 'No es posible actualizar los datos de una usuario inactivo.', 'error');
        }
      });
  }

  /**
   * Metodo que permite actualizar la informacion personal de una modelo en especifico
   */
   actualizarDatosModeloWC( forma: NgForm ) {
    if (forma.invalid) {
      return;
    }

    console.log('-'+this.usuarioLogged.role+'-'+this.roleActual+'-');

    if(this.usuarioLogged.role !== 'GOD_ROLE' && this.roleActual ==='GOD_ROLE') {
      Swal.fire('Error', 'No es posible actualizar los datos de ese usuario. No tiene los privilegios necesarios.', 'error');

    } else {
      this.usuarioService.actualizarUsuario( this.usuarioActualizar ).subscribe( resp => {
          // Navegar al dashboard
          this.router.navigateByUrl('/dashboard/usuarios');
  
          Swal.fire('Guardado', 'Datos de Usuario Actualizados Satisfactoriamente', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }
  }

}
