import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { EmailValidator } from '@angular/forms';

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
  
  googleInit() {

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

  logout() {
    localStorage.removeItem('token');
    
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew` , {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap( (resp:any) => {
        
        //Al renovar el token, en la response 
        //viaja la informacion del usuario, hay que
        //desestrcuturarla para obtener dicha info
        const {email, google, nombre, role, uid, img} = resp.usuario;
        
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError( error => of(false))
    );
  }

  crearUsuario( formData: RegisterForm ) {
    console.log('Invocación a UsuarioService(Front) - crearUsuario');
    return this.http.post(`${base_url}/usuarios/crearUsuario`, formData)
        .pipe(
          tap ( (resp :any) => {
            console.log(resp);
            localStorage.setItem('token', resp.token);
          })
        );
  }

  actualizarPerfilUsuario( data: {email: string, nombre: string, role: string} ) {

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${ base_url }/usuarios/actualizarUsuario/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  loginUsuario( formData: LoginForm) {
    console.log('Invocación a UsuarioService(Front) - loginUsuario');
    return this.http.post(`${base_url}/login`, formData)
        .pipe(
          tap ( (resp :any) => {
            localStorage.setItem('token', resp.token);
          })
        );
  }

  loginUsuarioGoogle( token ) {
    console.log('Invocación a UsuarioService(Front) - loginUsuarioGoogle');
    return this.http.post(`${base_url}/login/google`, {token})
        .pipe(
          tap ( (resp :any) => {
            localStorage.setItem('token', resp.token);
          })
        );
  }
}
