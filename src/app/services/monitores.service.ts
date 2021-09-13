import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { MonitorWC } from '../models/monitorwc.model';
import { UsuarioService } from './usuario.service';
import { CargarMonitor } from '../interfaces/cargar-monitores.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MonitoresService {

  public auth2: any;
  public monitor: MonitorWC;

  constructor( private http: HttpClient, 
               private router: Router,
               public usuarioService: UsuarioService) { }

  /**
   * 
   * @param formData 
   * @returns 
   */
  crearMonitor( formData: RegisterForm ) {
    console.log('Invocación a MonitoresService(Front) - crearMonitor');
    return this.http.post(`${base_url}/monitores/crearMonitor`, formData, this.usuarioService.headers);
  }

  /**
   * 
   * @param desde 
   * @returns 
   */
   cargarMonitoresDesde( desde: number = 0) {
    console.log('Invocación a MonitoresService(Front) - cargarMonitoresDesde');
    //localhost:3001/api/monitores?desde=5
    const url = `${ base_url }/monitores?desde=${ desde }`;
    return this.http.get<CargarMonitor>( url , this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const monitores = resp.monitores.map( 
            monitor => new MonitorWC(monitor._id, monitor.documento, monitor.tipoDocumento, monitor.genero, monitor.nombres, monitor.apellidos, monitor.fechaNac, 
              monitor.direccion, monitor.emailCorporativo, monitor.telCelular, monitor.rh, monitor.nomContEmer,
              monitor.telContEmer, monitor.fechaNac, monitor.estado, monitor.recomendado, monitor.numHijos, monitor.fechaCreacionApp,
              '', monitor.entidadBanco, monitor.numCuentaBanco, monitor.fechaInactivacion, monitor.img)
          );

          return {
            total: resp.total,
            monitores
          };
        })
      )
  }
  
  /**
   * 
   * @param monitor 
   * @returns 
   */
   modificarEstadoMonitor( monitor: MonitorWC, estado: Boolean ) {
    console.log('Invocación a MonitoresService(Front) - modificarEstadoMonitor');

    let url: string = '';

    if(!estado) { //le cambiaria el estado a false
      url = `${ base_url }/monitores/inactivarMonitor/${ monitor._id }`;
    } else { ////le cambiaria el estado a true
      url = `${ base_url }/monitores/reActivarMonitor/${ monitor._id }`;
    }

    //const url = `${ base_url }/monitores/inactivarMonitor/${ monitor._id }`;
    return this.http.put(url, null ,this.usuarioService.headers);
  }
  
  /**
   * 
   * @param _id 
   */
  buscarMonitorParticularWC( monitor: MonitorWC ) {
    console.log('Invocacion a MonitoresService(Front) - buscarMonitorParticularWC');
    const url = `${ base_url }/monitores/buscarMonitorId/${ monitor._id }`;
    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp.monitor));
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  buscarMonitorPorId( id: String) {
    console.log('Invocacion a MonitoresService(Front) - buscarMonitorPorId');
    const url = `${ base_url }/monitores/buscarMonitorId/${ id }`;
    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp.monitor));
  }
  
  /**
   * 
   * @param monitorActualizar 
   * @returns 
   */
  actualizarMonitor( monitorActualizar: MonitorWC ) {
    console.log('Invocación a MonitoresService(Front) - actualizarMonitor');
    return this.http.put(`${base_url}/monitores/actualizarMonitor/${ monitorActualizar._id }`, monitorActualizar, this.usuarioService.headers);
  }
}
