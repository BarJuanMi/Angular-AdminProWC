import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarAdmon } from '../interfaces/cargar-administrativos.interfaces';
import { RegisterForm } from '../interfaces/register-form.interface';
import { AdmonWC } from '../models/admonwc.model';
import { UsuarioService } from './usuario.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AdmonsService {

  public auth2: any;
  public administrativo: AdmonWC;

  constructor( private http: HttpClient, 
               private router: Router,
               public usuarioService: UsuarioService) { }

  /**
   * 
   * @param formData 
   * @returns 
   */
  crearAdministrativo( formData: RegisterForm ) {
    console.log('Invocación a AdmonsService(Front) - crearAdministrativo');
    return this.http.post(`${base_url}/administrativos/crearAdministrativo`, formData, this.usuarioService.headers);
  }               

  /**
   * 
   * @param desde 
   * @returns 
   */
   cargarAdmonsDesde( desde: number = 0) {
    console.log('Invocación a AdmonsService(Front) - cargarAdmonsDesde');
    const url = `${ base_url }/administrativos?desde=${ desde }`;
    return this.http.get<CargarAdmon>( url , this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const administrativos = resp.administrativos.map( 
            administrativo => new AdmonWC(administrativo._id, administrativo.documento, administrativo.tipoDocumento, 
              administrativo.genero, administrativo.nombres, administrativo.apellidos, administrativo.fechaNac, 
              administrativo.direccion, administrativo.emailCorporativo, administrativo.telCelular, 
              administrativo.rh, administrativo.nomContEmer, administrativo.telContEmer, administrativo.fechaIngreso, 
              administrativo.estado, administrativo.numHijos, administrativo.fechaCreacionApp, administrativo.nacionalidad, 
              administrativo.ciudadResidencia, '', administrativo.entidadBanco, 
              administrativo.numCuentaBanco, administrativo.fechaInactivacion, administrativo.img)
          );
          return {
            total: resp.total,
            administrativos
          };
        })
      )
  }

  /**
   * 
   * @param estado 
   * @returns 
   */
  cargarAdmonsFiltroEstado(estado: string) {
    console.log('Invocacion a AdmonsService(Front) - cargarAdmonsFiltroEstado');
    const url = `${ base_url }/administrativos/filtro?estado=${estado}`;

    //let params = new HttpParams();
    //params = params.append('estado', estado);

    return this.http.get<CargarAdmon>( url, this.usuarioService.headers)
      .pipe(
        map( resp => {
          const administrativos = resp.administrativos.map( 
            administrativo => new AdmonWC(administrativo._id, administrativo.documento, administrativo.tipoDocumento, 
              administrativo.genero, administrativo.nombres, administrativo.apellidos, administrativo.fechaNac, 
              administrativo.direccion, administrativo.emailCorporativo, administrativo.telCelular, 
              administrativo.rh, administrativo.nomContEmer, administrativo.telContEmer, administrativo.fechaIngreso, 
              administrativo.estado, administrativo.numHijos, administrativo.fechaCreacionApp, administrativo.nacionalidad, 
              administrativo.ciudadResidencia, '', administrativo.entidadBanco, 
              administrativo.numCuentaBanco, administrativo.fechaInactivacion, administrativo.img)
          );
          return {
            administrativos
          };
        })
      )
      //,params
  }
  
  /**
   * 
   * @param administrativo 
   * @returns 
   */
  modificarEstadoAdministrativo( administrativo: AdmonWC, estado: Boolean ) {
    console.log('Invocación a AdmonsService(Front) - modificarEstadoAdministrativo');
    
    let url: string = '';

    if(!estado) { //le cambiaria el estado a false
      url = `${ base_url }/administrativos/inactivarAdministrativo/${ administrativo._id }`;
    } else { ////le cambiaria el estado a true
      url = `${ base_url }/administrativos/inactivarAdministrativo/${ administrativo._id }`;
    }

    return this.http.put(url, null ,this.usuarioService.headers);
  }
  
  /**
   * 
   * @param _id 
   */
  buscarAdministrativoParticularWC( administrativo: AdmonWC ) {
    console.log('Invocacion a AdmonsService(Front) - buscarAdministrativoParticularWC');
    
    const url = `${ base_url }/administrativos/buscarAdministrativoId/${ administrativo._id }`;

    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp.administrativo));
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  buscarAdministrativoPorId( id: String) {
    console.log('Invocacion a AdmonsService(Front) - buscarAdministrativoPorId');

    const url = `${ base_url }/administrativos/buscarAdministrativoId/${ id }`;
    
    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp.administrativo));
  }
  
  /**
   * 
   * @param administrativoActualizar 
   * @returns 
   */
  actualizarAdministrativo( administrativoActualizar: AdmonWC ) {
    console.log('Invocación a AdmonsService(Front) - actualizarAdministrativo');
    return this.http.put(`${base_url}/administrativos/actualizarAdministrativo/${ administrativoActualizar._id }`, administrativoActualizar, this.usuarioService.headers);
  }
}
