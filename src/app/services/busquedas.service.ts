import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { ModeloWC } from '../models/modelowc.model';
import { MonitorWC } from '../models/monitorwc.model';
import { AdmonWC } from '../models/admonwc.model';
import { Empleado } from '../models/empleado.model';
import { Aspirante } from '../models/aspirante.model';

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

  transformarEmpleado(resultados: any[]): Empleado[] {
    return resultados.map(
      empleado => new Empleado(empleado._id, empleado.documento, empleado.tipoDocumento, empleado.genero, empleado.nombres, empleado.apellidos, empleado.nombApellConca, 
        empleado.tipoEmpleado, empleado.fechaNac, empleado.direccion, empleado.emailCorporativo, empleado.telCelular, empleado.rh, empleado.nomContEmer,
        empleado.telContEmer, empleado.fechaIngreso, empleado.estado, empleado.numHijos, empleado.fechaCreacionApp, empleado.nacionalidad, empleado.ciudadResidencia,
        empleado.epsSalud, empleado.arlTrabajo, empleado.usuarioCreacion, empleado.numHuellero, empleado.entidadBanco, empleado.numCuentaBanco, empleado.fechaInactivacion, 
        empleado.img)
    );
  }

  transformarAspirante(resultados: any[]): Aspirante[] {
    return resultados.map(
      aspirante => new Aspirante(aspirante._id, aspirante.documento, aspirante.nombres, aspirante.apellidos, aspirante.nombApellAspConcat, aspirante.edad,
                                aspirante.email, aspirante.numCelular, aspirante.usuarioCreacion, aspirante.cargoAspirante, aspirante.estado,
                                aspirante.notasEntrevistador, aspirante.direccion, aspirante.localidad, aspirante.experienciaPrevia, aspirante.fechaRegistro,
                                aspirante.fechaEntrevista, aspirante.pathResultadoPDF, aspirante.estadoResCargoPDF, aspirante.pathHojaVidaPDF, 
                                aspirante.estadoHVCargoPDF)
    );
  }

  buscarPorColeccion(tipo: 'usuarios'|'medicos'|'hospitales'|'aspirantes', termino: string) {
    //localhost:3001/api/busqueda/coleccion/tipo/***
    const url = `${ base_url }/busqueda/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>( url , this.headers)
      .pipe(
        map( (resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);
            
            case 'aspirantes':
              return this.transformarAspirante(resp.resultados);

            default:
              return[];
          }
        }));
  }

  buscarTerminoEnEmpleados(tipo: string, subTipo: string, termino: string) {
    //localhost:3001/api/busqueda/coleccion/empleados/modelo/***
    const url = `${ base_url }/busqueda/coleccion/${tipo}/${subTipo}/${termino}`;
    return this.http.get<any[]>( url , this.headers)
      .pipe(
        map( (resp: any) => {
              return this.transformarEmpleado(resp.resultados);
        }));
  }
}
