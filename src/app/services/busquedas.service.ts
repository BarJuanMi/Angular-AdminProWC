import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

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

  transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }

  buscarPorColeccion(tipo: 'usuarios'|'medicos'|'hospitales', termino: string) {
    //localhost:3001/api/busqueda/coleccion/usuarios/***
    const url = `${ base_url }/busqueda/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>( url , this.headers)
      .pipe(
        map( (resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);
          
            default:
              return[];
          }
        }));
  }
}
