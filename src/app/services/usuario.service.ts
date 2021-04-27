import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor( private http: HttpClient, 
               private router: Router,
               private ngZone: NgZone) { 
                 
    this.googleInit();
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
    const token = localStorage.getItem( 'token' ) || '';

    return this.http.get(`${base_url}/login/renew` , {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp:any) => {
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

  loginUsuario( formData: LoginForm) {
    console.log('Invocación a UsuarioService(Front) - loginUsuario');
    return this.http.post(`${base_url}/login`, formData)
        .pipe(
          tap ( (resp :any) => {
            console.log(resp);
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
