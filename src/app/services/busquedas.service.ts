import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { ModeloWC } from '../models/modelowc.model';
import { MonitorWC } from '../models/monitorwc.model';

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
      user => new Usuario(user.nombre, user.email, user.fechaCreacion, user.estado, '', user.img, user.google, user.role, user.uid)
    );
  }

  transformarModelos(resultados: any[]): ModeloWC[] {
    return resultados.map(
      modelo => new ModeloWC(modelo._id, modelo.documento, modelo.tipoDocumento, 
        modelo.genero, modelo.nombres, modelo.apellidos, modelo.fechaNac, 
        modelo.direccion, modelo.emailCorporativo, modelo.telCelular, 
        modelo.rh, modelo.nomContEmer, modelo.telContEmer, modelo.fechaIngreso, 
        false, modelo.numHijos, modelo.fechaCreacionApp, modelo.nacionalidad, 
        modelo.ciudadResidencia, '', modelo.entidadBanco, 
        modelo.numCuentaBanco, modelo.fechaInactivacion, modelo.img)
    );
  }

  transformarMonitores(resultados: any[]): MonitorWC[] {
    return resultados.map(
      monitor => new MonitorWC(monitor._id, monitor.documento, monitor.tipoDocumento, monitor.genero, monitor.nombres, monitor.apellidos, monitor.fechaNac, 
        monitor.direccion, monitor.emailCorporativo, monitor.telCelular, monitor.rh, monitor.nomContEmer,
        monitor.telContEmer, monitor.fechaNac, monitor.estado, monitor.recomendado, monitor.numHijos, monitor.fechaCreacionApp,
        '', monitor.entidadBanco, monitor.numCuentaBanco, monitor.fechaInactivacion, monitor.img)
    );
  }

  buscarPorColeccion(tipo: 'usuarios'|'medicos'|'hospitales'|'modelos'|'monitores', termino: string) {
    //localhost:3001/api/busqueda/coleccion/usuarios/***
    const url = `${ base_url }/busqueda/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>( url , this.headers)
      .pipe(
        map( (resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);

            case 'modelos':
              return this.transformarModelos(resp.resultados);

            case 'monitores':
              return this.transformarMonitores(resp.resultados);

            default:
              return[];
          }
        }));
  }
}
