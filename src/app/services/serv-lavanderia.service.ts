import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay, tap } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { UsuarioService } from './usuario.service';
import { environment } from 'src/environments/environment';
import { Servlavanderia } from '../models/servlavanderia.model';
import { CargarLavanderia } from '../interfaces/cargar-servlavanderias.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ServLavanderiaService {
  
  constructor( private http: HttpClient, 
    private router: Router,
    public usuarioService: UsuarioService) 
  { }

  /**
   * 
   * @param formData 
   */
  crearRegServLavan( formData: RegisterForm ) {
    console.log('Invocación a ServLavanderiaService(Front) - crearRegServLavan');
    return this.http.post(`${base_url}/lavanderias/crearRegServLavanderia`, formData, this.usuarioService.headers);
  }

  /**
   * 
   * @param desde 
   * @returns 
   */
   cargarServLavanderiaDesde( desde: number = 0) {
    console.log('Invocación a ServLavanderiaService(Front) - cargarServLavanderiaDesde');
    const url = `${ base_url }/lavanderias?desde=${ desde }`;
    return this.http.get<CargarLavanderia>( url , this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const servlavanderias = resp.servlavanderias.map( 
            lavanderia => new Servlavanderia(lavanderia._id, lavanderia.cantidadColchas, lavanderia.sede, lavanderia.estado, lavanderia.usuarioRegistro,
              lavanderia.fechaRegistro, lavanderia.fechaSalidaColchas, lavanderia.fechaRecibeColchas, lavanderia.obsSalidaColchas,
              lavanderia.obsRecibeColchas, lavanderia.recibeSatisfaccion, lavanderia.usuarioRecibeColchas, lavanderia._id.substring(10,25), lavanderia.img)
          );

          return {
            total: resp.total,
            servlavanderias
          };
        })
      )
  }

  /**
   * 
   * @param _id 
   */
  buscarServLavanPorId( id: string ) {
    console.log('Invocacion a ServLavanderiaService(Front) - buscarServLavanPorId');
    const url = `${ base_url }/lavanderias/buscarServLavanderiaId/${ id }`;
    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp.servLavan));
  }

  /**
   * 
   * @param servLava 
   * @param arg1 
   * @param arg2 
   * @param arg3 
   */
  actualizaEstadoServLavan(servLava: Servlavanderia, fechaRecibeColchas: string, recibeSatisfaccion: string, obsRecibeColchas: string) {
    var jsonStruc = {fechaRecibeColchas: fechaRecibeColchas, recibeSatisfaccion: recibeSatisfaccion, obsRecibeColchas: obsRecibeColchas};

    console.log('Invocación a ServLavanderiaService(Front) - actualizaEstadoServLavan');
    return this.http.put(`${base_url}/lavanderias/actualizarServLavanderia/${ servLava._id }`, jsonStruc, this.usuarioService.headers)
    .pipe(tap ( (resp :any) => {resp}));
  }

  /**
   * 
   * @param servLavan 
   * @returns 
   */
  eliminarServLavan(servLavan: Servlavanderia) {
    console.log('Invocación a ServLavanderiaService(Front) - eliminarServLavan');
    return this.http.delete(`${ base_url }/lavanderias/eliminarServLavanderia/${ servLavan._id }`, this.usuarioService.headers);
  }
}
