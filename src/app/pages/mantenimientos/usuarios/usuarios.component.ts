import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public mostrarBotones: boolean = true;
  public usuarioLogged: Usuario;

  constructor( private router: Router,
               private usuarioService: UsuarioService,
               private busquedasService: BusquedasService,
               private modalImagenService: ModalImagenService) 
  { 
    this.usuarioLogged = usuarioService.usuario;
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    console.log(this.usuarioLogged.role);
    if ( this.usuarioLogged.role != 'ADMIN_ROLE' && this.usuarioLogged.role != 'GOD_ROLE') {
      Swal.fire('Error', 'No puedes acceder a esta sección, no tienes los privilegios suficientes.', 'error');
      this.router.navigateByUrl('/');
    }
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(300))
    .subscribe ( img => this.cargarUsuarios() );
  }

  /**
   * Metodo que permite cargar el listado completo de usuarios de la aplicacion,
   * este metodo tiene iteraccion con el html y el respectivo service
   */
  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuariosDesde(this.desde).subscribe( ({ total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    });
  }

  /**
   * Metodo que permite manejar el paginador de la UI HTML de usuarios, a fin de
   * que los registros se muevan segun los valores de 8 y -8 estipulados en el HTML
   * @param valor (toma el valor de 8 o -8)
   */
  cambiarPagina( valor: number) {
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -=  valor;
    }

    this.cargarUsuarios();
  }

  /**
   * Metodo que permite iniciar la busqueda de un usuario mediante su nombre al
   * momento de digitar letras en el campo de busqueda del HTML
   * @param termino valor de letras quie son digitadas 1:1
   * @returns lista de usuarios que cumplen con la condicion de busqueda
   */
  buscarUsuariosTermino( termino: string) {
    // Mientras escribe las letras para la busqueda, se esconden los botones
    this.mostrarBotones = false;

    if ( termino.length === 0) {
      // Si ya no hay letras para la busqueda, aparecen los botones de nuevo
      this.mostrarBotones = true;
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscarPorColeccion( 'usuarios', termino)
        .subscribe( (resultados: Usuario[]) => {
          this.usuarios = resultados;
        });
  }

  /**
   * Metodo que permite inactivar fisicamente a un usuario de la aplicacion.
   * @param usuario objeto usuario seleccionado del listado en el UI HTML
   * @returns listado de usuarios restantes y mensaje de error en caso de 
   * intentar inactivarse a si mismo el usuario que esta logueado
   */
  eliminarUsuario( usuario: Usuario) {

    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'Un usuario no puede inactivarse a si mismo.', 'error');

    } else if ( this.usuarioLogged.role != 'ADMIN_ROLE' && this.usuarioLogged.role != 'GOD_ROLE') {
      return Swal.fire('Error', 'No es posible inactivar el usuario, no tienes los privilegios suficientes.', 'error');

    } else {
      Swal.fire({
        title: 'Esta seguro de inactivar el usuario?',
        text: 'El usuario quedara sin privilegios de acceso!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Inactivarlo!',
        backdrop: `
          rgba(0,0,123,0.4)
          url("./assets/images/gifs-swal/cat-nyan-cat.gif")
          left top
          no-repeat
        `
      }).then((result) => {
        if (result.isConfirmed){
          this.usuarioService.inactivarUsuario( usuario )
            .subscribe (resp => {
              Swal.fire(
                'Eliminado!',
                'El usuario ha sido inactivado exitosamente.',
                'success'
              );
              this.cargarUsuarios();   
            });
        }
      });
    }
  }

  /**
   * Metodo que permite reactivar a un usuario de la aplicacion.
   * @param usuario objeto usuario seleccionado del listado en el UI HTML
   * @returns listado de usuarios restantes
   */
   reActivarUsuario( usuario: Usuario) {
    Swal.fire({
      title: 'Esta seguro de reactivar el usuario?',
      text: 'El usuario quedara sin privilegios de acceso!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Reactivarlo!',
      backdrop: `
        rgba(0,0,123,0.4)
        url("./assets/images/gifs-swal/cat-nyan-cat.gif")
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed){
        this.usuarioService.reactivarUsuario( usuario )
          .subscribe (resp => {
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido reactivado exitosamente.',
              'success'
            );
            this.cargarUsuarios();   
          });
      }
    });
  }

  /**
   * Metodo que pérmite capturar en la inmediates de tocar la lista 
   * desplegable fgrente a un usuaruio de la lista para cambiar o 
   * asignarle un nuevo role a dicho usuario
   * @param usuario objeto usuario seleccionado del listado en el UI HTML
   */
  cambiarRole(usuario: Usuario) {
      this.usuarioService.actualizarRoleUsuario( usuario )
      .subscribe ( resp => {
        Swal.fire('Guardado', 'Se cambio el rol de ' + usuario.nombre+ ' satisfactoriamente.', 'success');
      }, ( err ) => {
        Swal.fire('Error', err.error.msg, 'error');
        this.cargarUsuarios();
      });
  }

  /**
   * Metodo que permite abrir el modal de carga de la imagen del usuario
   * @param usuario objeto al cual se le asociara la imagen
   */
  abrilModalImagen( usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
