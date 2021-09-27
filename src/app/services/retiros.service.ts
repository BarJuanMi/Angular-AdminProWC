import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { Retiro } from '../models/retiro.model';
import { CargarRetiro } from '../interfaces/cargar-retiro.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RetirosService {

  public auth2: any;
  public retiro: Retiro;

  constructor( private http: HttpClient, 
               private router: Router,
               public usuarioService: UsuarioService) { }

  /**
   * 
   * @param desde 
   * @returns 
   */
   cargarRetirosDesde( desde: number = 0) {
    console.log('Invocación a RetirosService(Front) - cargarRetirosDesde');
    //localhost:3001/api/retiros?desde=5
    const url = `${ base_url }/retiros?desde=${ desde }`;
    return this.http.get<CargarRetiro>( url , this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const retiros = resp.retiros.map( 
            retiro => new Retiro(retiro._id, retiro.modelo, 
              retiro.usuarioCreacion, retiro.fechaRenuncia,
              retiro.estado, retiro.motivoRetiro, retiro.entrevista, 
              retiro.encuesta, retiro.observaciones, retiro.fechaFirma)
          );

          return {
            total: resp.total,
            retiros
          };
        })
      )
  }

  /**
   * 
   * @param id 
   * @returns 
   */
   buscarRetiroPorId( id: String) {
    console.log('Invocacion a RetirosService(Front) - buscarRetiroPorId');
    const url = `${ base_url }/retiros/buscarRetiroId/${ id }`;
    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp.retiro));
  }
  
  /**
   * 
   * @param formData 
   * @returns 
   */
  crearNuevoRetiro( formData: RegisterForm ) {
    console.log('Invocación a RetirosService(Front) - crearNuevoRetiro');
    return this.http.post(`${base_url}/retiros/crearRetiro`, formData, this.usuarioService.headers);
  }
  
  /**
   * 
   * @param retiro 
   * @returns 
   */
  eliminarRetiro( retiro: Retiro) {
    console.log('Invocación a RetirosService(Front) - eliminarRetiro');
    return this.http.delete(`${ base_url }/retiros/eliminarRetiro/${ retiro._id }`, this.usuarioService.headers);
  }

  /**
   * 
   * @param retiro 
   */
  actualizarRetiro( retiro: Retiro) {
    console.log('WWWWWW' + JSON.stringify(retiro));
    console.log('Invocación a RetirosService(Front) - actualizarRetiro');
    return this.http.put(`${ base_url }/retiros/actualizarRetiro/${ retiro._id }`, retiro, this.usuarioService.headers);
  }
}
