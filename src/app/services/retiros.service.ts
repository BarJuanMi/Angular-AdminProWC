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
   * Metodo que permite cargar todos los retiros que se encuentren en la base de datos.
   * @param desde es el filtro desde donde marcara para obtener los retiro desde ahi en adelante.
   * @returns Listado de retiros.
   */
   cargarRetirosDesde( desde: number = 0) {
    console.log('Invocación a RetirosService(Front) - cargarRetirosDesde');
    //44.208.35.77:3001/api/retiros?desde=25
    const url = `${ base_url }/retiros?desde=${ desde }`;
    return this.http.get<CargarRetiro>( url , this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const retiros = resp.retiros.map( 
            retiro => new Retiro(retiro._id, retiro.empleado, retiro.emplNomApel,
              retiro.usuarioRegistro, retiro.fechaRenuncia, retiro.fechaRegistro,
              retiro.estado, retiro.motivoRetiro, retiro.entrevista, 
              retiro.encuesta, retiro.fechaFirma, retiro.fechaCargoPDF,
              retiro.usuarioCargoPDF, retiro.pathPDF, retiro.estadoCargoPDF)
          );

          return {
            total: resp.total,
            retiros
          };
        })
      )
  }

  /**
   * Metodo que permite cargar un retiro en especifico buscandolo mediante su id interno
   * @param id numero de representacion del retiro dentro de la base de datos
   * @returns Objeto de retiro que fue retornado por la base de datos
   */
   buscarRetiroPorId( id: String) {
    console.log('Invocacion a RetirosService(Front) - buscarRetiroPorId');
    const url = `${ base_url }/retiros/buscarRetiroId/${ id }`;
    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp.retiro));
  }
  
  /**
   * Metodo que permite crear un registro de retiro nuevo en la base de datos
   * @param formData Objeto con la informacion del nuevo retiro
   * @returns Informacion del proceso si fue o no exitoso en la insercion
   */
  crearNuevoRetiro( formData: RegisterForm ) {
    console.log('Invocación a RetirosService(Front) - crearNuevoRetiro');
    return this.http.post(`${base_url}/retiros/crearRetiro`, formData, this.usuarioService.headers);
  }
  
  /**
   * Metodo que permite eliminar un registro de retiro en la base de datos
   * @param retiro Objeto con la informacion del retiro que se va a eliminar
   * @returns Informacion del proceso si fue o no exitoso en la eliminacion
   */
  eliminarRetiro( retiro: Retiro) {
    console.log('Invocación a RetirosService(Front) - eliminarRetiro');
    return this.http.delete(`${ base_url }/retiros/eliminarRetiro/${ retiro._id }`, this.usuarioService.headers);
  }

  /**
   * Metodo que permite actualizar un registro de retiro en la base de datos
   * @param retiro Objeto con la informacion del retiro que se va a actualizar
   * @returns Informacion del proceso si fue o no exitoso en la actualizacion
   */
  actualizarRetiro( retiro: Retiro) {
    console.log('Invocación a RetirosService(Front) - actualizarRetiro');
    return this.http.put(`${ base_url }/retiros/actualizarRetiro/${ retiro._id }`, retiro, this.usuarioService.headers);
  }
}
