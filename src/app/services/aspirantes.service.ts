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
   * 
   * @param desde 
   * @returns 
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
   * 
   * @param formData 
   * @returns 
   */
   crearNuevoAspirante( formData: RegisterForm ) {
    console.log('Invocación a AspirantesService(Front) - crearNuevoAspirante');
    return this.http.post(`${base_url}/aspirantes/crearRegAspirante`, formData, this.usuarioService.headers);
  }

  /**
   * 
   * @param aspirante 
   * @returns 
   */
  buscarAspiranteParticular( aspirante: Aspirante ) {
    console.log('Invocacion a AspirantesService(Front) - buscarAspiranteParticular');
    return this.http.get( `${ base_url }/aspirantes/buscarAspirantePorId/${ aspirante._id }`, 
                      this.usuarioService.headers ).pipe(map( (resp: any) => resp.aspirante));
  }

  /**
   * 
   */
  cambiarEstadoAspirante( aspirante: Aspirante, nuevoEstado: string) {
    console.log('Invocacion a AspirantesService(Front) - cambiarEstadoAspirante');
    aspirante.estado = nuevoEstado;
    console.log(aspirante);
    return this.http.put(`${base_url}/aspirantes/cambiarAspiranteEstado/${ aspirante._id }`, aspirante, this.usuarioService.headers)
    .pipe(tap ( (resp :any) => {resp}));
  }

}
