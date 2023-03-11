import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay, tap } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { Ausentismo } from '../models/ausentismo.model';
import { CargarAusentismo } from '../interfaces/cargar-ausentismos.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AusentismosService {

  public auth2: any;
  public ausentismo: Ausentismo;

  constructor( private http: HttpClient, 
               private router: Router,
               public usuarioService: UsuarioService) { }

  /**
   * Metodo que permite cargar todos los ausentismos que se encuentren en la base de datos.
   * @param desde es el filtro desde donde marcara para obtener los ausentismo desde ahi en adelante.
   * @returns Listado de ausentismos.
   */
   cargarAusentismosDesde( desde: number = 0) {
    console.log('Invocación a AusentismosService(Front) - cargarAusentismosDesde');
    //44.208.35.77:3001/api/ausentismos?desde=25
    const url = `${ base_url }/ausentismos?desde=${ desde }`;
    return this.http.get<CargarAusentismo>( url , this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const ausentismos = resp.ausentismos.map( 
            ausentismo => new Ausentismo(ausentismo._id, ausentismo.empleado, ausentismo.estado, 
              ausentismo.tipoAusentismo, ausentismo.fechaInicio, ausentismo.fechaFinalizacion, 
              ausentismo.emplNomApel, ausentismo.usuarioRegistro,
              ausentismo.fechaRegistro, ausentismo.obserAprobRecha, ausentismo.fechaAprobRecha, 
              ausentismo.usuarioAprobRecha, ausentismo.fechaCargoPDF,
              ausentismo.usuarioCargoPDF, ausentismo.pathPDF, ausentismo.estadoCargoPDF)
          );
          
          return {
            total: resp.total,
            ausentismos
          };
        })
      )
  }

  /**
   * Metodo que permite cargar un ausentismo en especifico buscandolo mediante su id interno
   * @param id numero de representacion del ausentismo dentro de la base de datos
   * @returns Objeto de ausentismo que fue retornado por la base de datos
   */
   buscarAusentismoPorId( id: String) {
    console.log('Invocacion a AusentismosService(Front) - buscarAusentismoPorId');
    const url = `${ base_url }/ausentismos/buscarRegAusentismoId/${ id }`;
    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp.ausentismo));
  }
  
  /**
   * Metodo que permite crear un registro de ausentismo nuevo en la base de datos
   * @param formData Objeto con la informacion del nuevo ausentismo
   * @returns Informacion del proceso si fue o no exitoso en la insercion
   */
  crearNuevoAusentismo( formData: RegisterForm ) {
    console.log('Invocación a AusentismosService(Front) - crearNuevoAusentismo');
    return this.http.post(`${base_url}/ausentismos/crearRegAusentismo`, formData, this.usuarioService.headers);
  }
  
  /**
   * Metodo que permite eliminar un registro de ausentismo en la base de datos
   * @param ausentismo Objeto con la informacion del ausentismo que se va a eliminar
   * @returns Informacion del proceso si fue o no exitoso en la eliminacion
   */
  eliminarAusentismo( ausentismo: Ausentismo) {
    console.log('Invocación a AusentismosService(Front) - eliminarAusentismo');
    return this.http.delete(`${ base_url }/ausentismos/eliminarRegAusentismo/${ ausentismo._id }`, this.usuarioService.headers);
  }

  /**
   * Metodo que permite actualizar un registro de ausentismo en la base de datos
   * @param ausentismo Objeto con la informacion del ausentismo que se va a actualizar
   * @returns Informacion del proceso si fue o no exitoso en la actualizacion
   */
  actualizarAusentismo( ausentismo: Ausentismo, estadoNew: string, observaciones: string) {
    console.log('Invocación a AusentismosService(Front) - actualizarAusentismo');
    var jsonStruc = {estado: estadoNew, obserAprobRecha: observaciones, fechaAprobRecha: new Date()};
    
    return this.http.put(`${ base_url }/ausentismos/actualizarRegAusentismo/${ ausentismo._id }`, jsonStruc, this.usuarioService.headers)
    .pipe(tap ( (resp :any) => {resp}));
  }
}
