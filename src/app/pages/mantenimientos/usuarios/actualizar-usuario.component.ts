import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  usuarioActualizar: Usuario = new Usuario('','',new Date(),'','','',false,'','','');

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
                
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
    
    this.usuarioService.actualizarUsuario( this.usuarioActualizar ).subscribe( resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard/usuarios');

        Swal.fire('Guardado', 'Datos de Usuario Actualizados Satisfactoriamente', 'success');
    }, ( err ) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
