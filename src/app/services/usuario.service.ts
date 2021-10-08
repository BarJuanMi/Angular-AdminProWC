import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient, 
               private router: Router,
               private ngZone: NgZone) { 
                 
    this.googleInit();
  }

  get uid():string {
    return this.usuario.uid || '';
  }

  get token(): string {
    return localStorage.getItem( 'token' ) || '';
  }

  get headers() {
    return { 
      headers: {
        'x-token': this.token
      }
    }
  }
  
  /**
   * 
   * @returns 
   */
  googleInit() {
    console.log('Invocación a UsuarioService(Front) - googleInit');
    return new Promise<void> ( resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '82209796860-ac645d29mjsvhb6hrnnmj0msafmu0b0p.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }
  
  /**
   * 
   */
  logout() {
    console.log('Invocación a UsuarioService(Front) - logout');
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
  
  /**
   * 
   * @returns 
   */
  validarToken(): Observable<boolean> {
    console.log('Invocación a UsuarioService(Front) - validarToken');
    return this.http.get(`${base_url}/login/renew` , {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap( (resp:any) => {
        
        //Al renovar el token, en la response 
        //viaja la informacion del usuario, hay que
        //desestrcuturarla para obtener dicha info
        const {email, fechaCreacion, estado, google, nombre, role, uid, img} = resp.usuario;
        
        this.usuario = new Usuario(nombre, email, fechaCreacion, estado, '', img, google, role, uid);
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError( error => of(false))
    );
  }
  
  /**
   * 
   * @param formData 
   * @returns 
   */
  crearUsuario( formData: RegisterForm ) {
    console.log('Invocación a UsuarioService(Front) - crearUsuario');
    return this.http.post(`${base_url}/usuarios/crearUsuarioPorRegister`, formData)
        .pipe(
          tap ( (resp :any) => {
            console.log(resp);
            localStorage.setItem('token', resp.token);
          })
        );
  }
  
  /**
   * 
   * @param data 
   * @returns 
   */
  actualizarPerfilUsuario( data: {email: string, nombre: string, role: string} ) {
    console.log('Invocación a UsuarioService(Front) - actualizarPerfilUsuario');
    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${ base_url }/usuarios/actualizarUsuario/${ this.uid }`, data, this.headers);
  }
  
  /**
   * 
   * @param formData 
   * @returns 
   */
  loginUsuario( formData: LoginForm) {
    console.log('Invocación a UsuarioService(Front) - loginUsuario');
    return this.http.post(`${base_url}/login`, formData)
        .pipe(
          tap ( (resp :any) => {
            localStorage.setItem('token', resp.token);
          })
        );
  }
  
  /**
   * 
   * @param token 
   * @returns 
   */
  loginUsuarioGoogle( token ) {
    console.log('Invocación a UsuarioService(Front) - loginUsuarioGoogle');
    return this.http.post(`${base_url}/login/google`, {token})
        .pipe(
          tap ( (resp :any) => {
            localStorage.setItem('token', resp.token);
          })
        );
  }
  
  /**
   * 
   * @param desde 
   * @returns 
   */
  cargarUsuariosDesde( desde: number = 0) {
    console.log('Invocación a UsuarioService(Front) - cargarUsuariosDesde');
    //localhost:3001/api/usuarios?desde=5
    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>( url , this.headers)
      .pipe(
        delay(500), 
        map( resp => {
          console.log('usuarios...' + resp);
          const usuarios = resp.usuarios.map( 
            user => new Usuario(user.nombre, user.email, user.fechaCreacion, user.estado, '', user.img, user.google, user.role, user.uid)
          );

          return {
            total: resp.total,
            usuarios
          };
        })
      )
  }
  
  /**
   * 
   * @param usuario 
   * @returns 
   */
   inactivarUsuario( usuario: Usuario) {
    console.log('Invocación a UsuarioService(Front) - inactivarUsuario');
    return this.http.delete(`${ base_url }/usuarios/inactivarUsuario/${ usuario.uid }`, {
      headers: {
        'x-token': this.token
      }
    });
  }

  /**
   * 
   * @param usuario 
   * @returns 
   */
   reactivarUsuario( usuario: Usuario) {
    console.log('Invocación a UsuarioService(Front) - reactivarUsuario');
    return this.http.put(`${ base_url }/usuarios/reactivarUsuario/${ usuario.uid }`, {
      headers: {
        'x-token': this.token
      }
    });
  }
  
  /**
   * 
   * @param usuario 
   * @returns 
   */
  actualizarRoleUsuario( usuario: Usuario) {
    console.log('Invocación a UsuarioService(Front) - actualizarRoleUsuario');
    return this.http.put(`${ base_url }/usuarios/actualizarUsuario/${ usuario.uid }`, usuario, this.headers);
  }

  /**
   * 
   * @param formData 
   * @returns 
   */
  crearNuevoUsuarioApp( formData: RegisterForm ) {
    console.log('Invocación a UsuarioService(Front) - crearNuevoUsuarioApp');
    return this.http.post(`${base_url}/usuarios/crearUsuarioPorApp`, formData);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  buscarUsuarioPorId( id: String) {
    console.log('Invocacion a UsuarioService(Front) - buscarUsuarioPorId');
    const url = `${ base_url }/usuarios/buscarUsuarioId/${ id }`;
    return this.http.get( url, this.headers ).pipe(map( (resp: any) => resp.usuario));
  }

  /**
   * 
   * @param usuarioActualizar 
   * @returns 
   */
   actualizarUsuario( usuarioActualizar: Usuario ) {
    console.log('Invocación a UsuarioService(Front) - actualizarUsuario');
    return this.http.put(`${base_url}/usuarios/actualizarUsuario/${ usuarioActualizar.uid }`, usuarioActualizar, this.headers);
  }
}
