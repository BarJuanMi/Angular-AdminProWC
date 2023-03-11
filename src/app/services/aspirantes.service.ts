import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay, tap } from 'rxjs/operators';
import { Aspirante } from '../models/aspirante.model';
import { UsuarioService } from './usuario.service';
import { environment } from 'src/environments/environment';
import { CargarAspirante } from '../interfaces/cargar-aspirantes.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AspirantesService {

  public auth2: any;
  public aspirante: Aspirante;

  constructor( private http: HttpClient, 
               private router: Router,
               public usuarioService: UsuarioService) { }

  /**
   * Metodo que permite cargar todos los aspirantes que se encuentren en la base de datos.
   * @param desde es el filtro desde donde marcara para obtener los aspirante desde ahi en adelante.
   * @returns Listado de aspirantes.
   */
   cargarAspirantesDesde( desde: number = 0) {
    console.log('Invocación a AspirantesService(Front) - cargarAspirantesDesde');
    const url = `${ base_url }/aspirantes?desde=${ desde }`;
    return this.http.get<CargarAspirante>( url , this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const aspirantes = resp.aspirantes.map( 
            aspirante => new Aspirante(aspirante._id, aspirante.documento, aspirante.nombres, aspirante.apellidos, aspirante.nombApellAspConcat, 
                                       aspirante.edad, aspirante.email, aspirante.numCelular, aspirante.usuarioCreacion, 
                                       aspirante.cargoAspirante, aspirante.estado, aspirante.notasEntrevistador, aspirante.direccion, 
                                       aspirante.localidad, aspirante.experienciaPrevia, aspirante.fechaRegistro, aspirante.fechaEntrevista,
                                       aspirante.pathResultadoPDF, aspirante.estadoResCargoPDF, aspirante.pathHojaVidaPDF, aspirante.estadoHVCargoPDF)
          );

          return {
            total: resp.total,
            aspirantes
          };
        })
      )
  }

  /**
   * Metodo que permite crear un registro de aspirante nuevo en la base de datos
   * @param formData Objeto con la informacion del nuevo aspirante
   * @returns Informacion del proceso si fue o no exitoso en la insercion
   */
   crearNuevoAspirante( formData: RegisterForm ) {
    console.log('Invocación a AspirantesService(Front) - crearNuevoAspirante');
    return this.http.post(`${base_url}/aspirantes/crearRegAspirante`, formData, this.usuarioService.headers);
  }

  /**
   * Metodo que permite cargar un aspirante en especifico buscandolo mediante su id interno
   * @param id numero de representacion del aspirante dentro de la base de datos
   * @returns Objeto de aspirante que fue retornado por la base de datos
   */
  buscarAspiranteParticular( aspirante: Aspirante ) {
    console.log('Invocacion a AspirantesService(Front) - buscarAspiranteParticular');
    return this.http.get( `${ base_url }/aspirantes/buscarAspirantePorId/${ aspirante._id }`, 
                      this.usuarioService.headers ).pipe(map( (resp: any) => resp.aspirante));
  }

  /**
   * Metodo que permite actualizar un registro de aspirante en la base de datos
   * @param aspirante Objeto con la informacion del aspirante que se va a actualizar
   * @param nuevoEstado Objeto con la informacion del nuevo estado
   * @returns Informacion del proceso si fue o no exitoso en la actualizacion
   */
  cambiarEstadoAspirante( aspirante: Aspirante, nuevoEstado: string) {
    console.log('Invocacion a AspirantesService(Front) - cambiarEstadoAspirante');
    aspirante.estado = nuevoEstado;
    console.log(aspirante);
    return this.http.put(`${base_url}/aspirantes/cambiarAspiranteEstado/${ aspirante._id }`, aspirante, this.usuarioService.headers)
    .pipe(tap ( (resp :any) => {resp}));
  }

}
