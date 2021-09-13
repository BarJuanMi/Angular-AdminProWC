import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModeloWC } from '../models/modelowc.model';
import { Pais } from '../models/pais.util.model';
import { map, delay } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { CargarModelo } from '../interfaces/cargar-modelos.interface';
import { UsuarioService } from './usuario.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  public auth2: any;
  public modelo: ModeloWC;

  constructor( private http: HttpClient, 
               private router: Router,
               public usuarioService: UsuarioService) { }

  /**
   * 
   * @param formData 
   * @returns 
   */
  crearModelo( formData: RegisterForm ) {
    console.log('Invocación a ModelosService(Front) - crearModelo');
    return this.http.post(`${base_url}/modelos/crearModelo`, formData, this.usuarioService.headers);
  }               

  /**
   * 
   * @param desde 
   * @returns 
   */
  cargarModelosDesde( desde: number = 0) {
    console.log('Invocación a ModelosService(Front) - cargarUsuariosDesde');
    //localhost:3001/api/modelos?desde=5
    const url = `${ base_url }/modelos?desde=${ desde }`;
    return this.http.get<CargarModelo>( url , this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const modelos = resp.modelos.map( 
            modelo => new ModeloWC(modelo._id, modelo.documento, modelo.tipoDocumento, 
              modelo.genero, modelo.nombres, modelo.apellidos, modelo.fechaNac, 
              modelo.direccion, modelo.emailCorporativo, modelo.telCelular, 
              modelo.rh, modelo.nomContEmer, modelo.telContEmer, modelo.fechaIngreso, 
              modelo.estado, modelo.numHijos, modelo.fechaCreacionApp, modelo.nacionalidad, 
              modelo.ciudadResidencia, '', modelo.entidadBanco, 
              modelo.numCuentaBanco, modelo.fechaInactivacion, modelo.img)
          );
          return {
            total: resp.total,
            modelos
          };
        })
      )
  }

  /**
   * 
   * @param estado 
   * @returns 
   */
  cargarModelosFiltroEstado(estado: string) {
    console.log('Invocacion a ModelosService(Front) - cargarModelosFiltroEstado');
    const url = `${ base_url }/modelos/filtro?estado=${estado}`;

    //let params = new HttpParams();
    //params = params.append('estado', estado);

    return this.http.get<CargarModelo>( url, this.usuarioService.headers)
      .pipe(
        map( resp => {
          const modelos = resp.modelos.map( 
            modelo => new ModeloWC(modelo._id, modelo.documento, modelo.tipoDocumento, 
              modelo.genero, modelo.nombres, modelo.apellidos, modelo.fechaNac, 
              modelo.direccion, modelo.emailCorporativo, modelo.telCelular, 
              modelo.rh, modelo.nomContEmer, modelo.telContEmer, modelo.fechaIngreso, 
              false, modelo.numHijos, modelo.fechaCreacionApp, modelo.nacionalidad, 
              modelo.ciudadResidencia, '', modelo.entidadBanco, 
              modelo.numCuentaBanco, modelo.fechaInactivacion, modelo.img)
          );
          return {
            modelos
          };
        })
      )
      //,params
  }
  
  /**
   * 
   * @param modelo 
   * @returns 
   */
  modificarEstadoModelo( modelo: ModeloWC, estado: Boolean ) {
    console.log('Invocación a ModelosService(Front) - modificarEstadoModelo');
    
    let url: string = '';

    if(!estado) { //le cambiaria el estado a false
      url = `${ base_url }/modelos/inactivarModelo/${ modelo._id }`;
    } else { ////le cambiaria el estado a true
      url = `${ base_url }/modelos/reActivarModelo/${ modelo._id }`;
    }

    return this.http.put(url, null ,this.usuarioService.headers);
  }
  
  /**
   * 
   * @param _id 
   */
  buscarModeloParticularWC( modelo: ModeloWC ) {
    console.log('Invocacion a ModelosService(Front) - buscarModeloParticularWC');
    
    const url = `${ base_url }/modelos/buscarModeloId/${ modelo._id }`;

    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp.modelo));
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  buscarModeloPorId( id: String) {
    console.log('Invocacion a ModelosService(Front) - buscarModeloPorId');
    const url = `${ base_url }/modelos/buscarModeloId/${ id }`;
    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp.modelo));
  }
  
  /**
   * 
   * @param modeloActualizar 
   * @returns 
   */
  actualizarModelo( modeloActualizar: ModeloWC ) {
    console.log('Invocación a ModelosService(Front) - actualizarModelo');
    return this.http.put(`${base_url}/modelos/actualizarModelo/${ modeloActualizar._id }`, modeloActualizar, this.usuarioService.headers);
  }

}
