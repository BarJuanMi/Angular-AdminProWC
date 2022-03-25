import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarPQRS } from '../interfaces/cargar-pqrsi.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { PQRS } from '../models/pqrs.model';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PqrsiService {
  
  public auth2: any;
  public pqrsi: PQRS;

  constructor( private http: HttpClient, 
               private router: Router,
               public usuarioService: UsuarioService) { }
  
  /**
   * 
   * @param desde 
   * @returns 
   */
  cargarPQRSIDesde(desde: number = 0) {
    console.log('Invocación a PqrsiService(Front) - cargarPQRSIDesde');
    const url = `${ base_url }/pqrs?desde=${ desde }`;
    return this.http.get<CargarPQRS>( url , this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const pqrsi = resp.pqrsi.map( 
            pqrs => new PQRS(pqrs._id, pqrs.detallePrimario, pqrs.prioridad, pqrs.estado, pqrs.evidencia, 
              pqrs.fechaOcurrencia, pqrs.fechaRegistro, pqrs.sede, pqrs.empleadoAsociado, pqrs.tipo, 
              pqrs.usuarioRegistro, pqrs.usuarioAsignado, pqrs.respuestaAsociadaOne, pqrs.respuestaAsociadaTwo, pqrs.img)
          );

          return {
            total: resp.total,
            pqrsi
          };
        })
      )
  }

  /**
   * 
   * @param pqrs 
   * @returns 
   */
  buscarPQRSParticular(pqrs: PQRS) {
    console.log('Invocacion a PqrsiService(Front) - buscarPQRSParticular');
    return this.http.get( `${ base_url }/pqrs/obtenerPQRSId/${ pqrs._id }`, 
                      this.usuarioService.headers ).pipe(map( (resp: any) => resp.pqrs));
  }

  /**
   * 
   * @param formData 
   * @returns 
   */
   crearPQRSIncidente( formData: RegisterForm ) {
    console.log('Invocación a PqrsiService(Front) - crearPQRSIncidente');
    return this.http.post(`${base_url}/pqrs/crearPQRS`, formData, this.usuarioService.headers);
  }
  
  /**
   * 
   * @param usuario 
   */
  buscarPQRSFiltradas(usuario: Usuario, desde: number = 0) {
    console.log('Invocacion a PqrsiService(Front) - buscarPQRSFiltradas');
    console.log('Usuario:' + JSON.stringify(usuario));
    console.log('desde:' + desde);

    let data = {
      usuarioAsignado: usuario.uid
    }
    const url = `${ base_url }/pqrs/obtenerPQRSFiltradas?desde=${ desde }`;
    return this.http.post<CargarPQRS>( url , data, this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const pqrsi = resp.pqrsi.map( 
            pqrs => new PQRS(pqrs._id, pqrs.detallePrimario, pqrs.prioridad, pqrs.estado, pqrs.evidencia, 
              pqrs.fechaOcurrencia, pqrs.fechaRegistro, pqrs.sede, pqrs.empleadoAsociado, pqrs.tipo, 
              pqrs.usuarioRegistro, pqrs.usuarioAsignado, pqrs.respuestaAsociadaOne, pqrs.respuestaAsociadaTwo, pqrs.img)
          );

          return {
            total: resp.total,
            pqrsi
          };
        })
      )
  }
  
  /**
   * 
   * @param pqrs 
   */
  eliminarPQRS(pqrs: PQRS) {
    console.log('Invocación a PqrsiService(Front) - eliminarPQRS');
    return this.http.delete(`${base_url}/pqrs/eliminarPQRS/${pqrs._id}`, this.usuarioService.headers);
  }
  
  /**
   * 
   * @param pqrs 
   * @param arg1 
   * @param arg2 
   * @param arg3 
   */
  actualizarEstadoPQRS(pqrs: PQRS, estadoArg1: string, prioridadArg2: string, respArg3: string) {
    var jsonStruc = {
      estado: estadoArg1, 
      prioridad: prioridadArg2, 
      respuesta: respArg3
    };

    console.log('Invocación a PqrsiService(Front) - actualizarEstadoPQRS');
    return this.http.put(`${base_url}/pqrs/actualizarPQRS/${ pqrs._id }`, jsonStruc, this.usuarioService.headers)
    .pipe(tap ( (resp :any) => {resp}));
  }
}
