import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { CargarEmpleado } from '../interfaces/cargar-empleados.interface';
import { Empleado } from '../models/empleado.model';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  

  constructor(private http: HttpClient, 
              private router: Router,
              public usuarioService: UsuarioService) { }

  /**
   * Metodo que permite cargar todos los empleados que se encuentren en la base de datos.
   * @param desde es el filtro desde donde marcara para obtener los empleado desde ahi en adelante.
   * @param tipo es el filtro del tipo de empleados que servira a la peticion enviada al backend.
   * @returns Listado de empleados.
   */
  cargarEmpleadosxTipoDesde( tipo: string, desde: number = 0) {
    console.log('Invocación a EmpleadosService(Front) - cargarEmpleadosxTipoDesde');

    const url = `${ base_url }/empleados/tipo/${tipo}?desde=${ desde }`;
    
    return this.http.get<CargarEmpleado>( url ,  this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const empleados = resp.empleados.map( 
            empleado => new Empleado(empleado._id, empleado.documento, empleado.tipoDocumento, 
              empleado.genero, empleado.nombres, empleado.apellidos, empleado.nombApellConca, empleado.tipoEmpleado, empleado.fechaNac, 
              empleado.direccion, empleado.emailCorporativo, empleado.telCelular, 
              empleado.rh, empleado.nomContEmer, empleado.telContEmer, empleado.fechaIngreso, 
              empleado.estado, empleado.numHijos, empleado.fechaCreacionApp, empleado.nacionalidad,
              empleado.ciudadResidencia,  empleado.epsSalud, empleado.arlTrabajo, empleado.usuarioCreacion, '', empleado.entidadBanco, 
              empleado.numCuentaBanco, empleado.fechaInactivacion, empleado.img)
          );

          return {
            total: resp.total,
            empleados
          };
        })
      )
  }
  
  /**
   * Metodo que permite crear un registro de empleado nuevo en la base de datos.
   * @param formData Objeto con la informacion del nuevo empleado.
   * @param tipoEmpleCrear es el filtro del tipo de empleados que servira a la peticion enviada al backend.
   * @returns Informacion del proceso si fue o no exitoso en la insercion.
   */
  crearEmpleadoxTipo(formData: RegisterForm, tipoEmpleCrear: String) {
    console.log('Invocación a ModelosService(Front) - crearEmpleadoxTipo');

    let url: string = '';

    url = `${base_url}/empleados/crearEmpleadoxTipo/${tipoEmpleCrear}`
    console.log(url);
    return this.http.post(url, formData, this.usuarioService.headers);
  }

  /**
   * Metodo que permite actualizar un registro de empleado en la base de datos
   * @param empleado Objeto con la informacion del empleado que se va a actualizar
   * @param estado Objeto con la informacion del nuevo estado
   * @returns Informacion del proceso si fue o no exitoso en la actualizacion
   */
   modificarEstadoEmpleado( empleado: Empleado, estado: Boolean ) {
    console.log('Invocación a EmpleadosService(Front) - modificarEstadoEmpleado');

    let url: string = '';

    if(!estado) { //le cambiaria el estado a false
      url = `${ base_url }/empleados/inactivarEmpleado/${ empleado._id }`;
    } else { ////le cambiaria el estado a true
      url = `${ base_url }/empleados/reActivarEmpleado/${ empleado._id }`;
    }

    return this.http.put(url, null ,this.usuarioService.headers);
  }

  /**
   * Metodo que permite cargar un empleado en especifico buscandolo mediante su id interno
   * @param id numero de representacion del empleado dentro de la base de datos
   * @returns Objeto de empleado que fue retornado por la base de datos
   */
   buscarEmpleadoPorId( id: String) {
    console.log('Invocacion a EmpleadosService(Front) - buscarEmpleadoPorId');

    return this.http.get( `${ base_url }/empleados/buscarEmpleadoId/${ id }`, 
                      this.usuarioService.headers ).pipe(map( (resp: any) => resp.empleado));
  }

  /**
   * Metodo que permite cargar un empleado en especifico buscandolo mediante su id interno
   * @param id numero de representacion del empleado dentro de la base de datos
   * @returns Objeto de empleado que fue retornado por la base de datos
   */
   buscarEmpleadoParticular( empleado: Empleado ) {
    console.log('Invocacion a ModelosService(Front) - buscarModeloParticularWC');

    return this.http.get( `${ base_url }/empleados/buscarEmpleadoId/${ empleado._id }`, 
                      this.usuarioService.headers ).pipe(map( (resp: any) => resp.empleado));
  }
  
  /**
   * Metodo que permite actualizar un registro de empleado en la base de datos
   * @param empleadoActualizar Objeto con la informacion del empleado que se va a actualizar
   * @returns Informacion del proceso si fue o no exitoso en la actualizacion
   */
  actualizarEmpleadoPorId( empleadoActualizar: Empleado ) {
    console.log('Invocación a EmpleadosService(Front) - actualizarEmpleadoPorId');

    return this.http.put(`${base_url}/empleados/actualizarEmpleado/${ empleadoActualizar._id }`, 
                      empleadoActualizar, this.usuarioService.headers);
  }

  /**
   * Metodo que permite cargar todos los empleados que se encuentren en la base de datos filtrandolo por el estado.
   * @param estado es el filtro que se le aplicara a la busqueda.
   * @returns Listado de empleados.
   */
   cargarEmpleadosFiltroEstado(estado: string) {
    console.log('Invocacion a EmpleadosService(Front) - cargarEmpleadosFiltroEstado');
    const url = `${ base_url }/empleados/filtro/estado/estado=${estado}`;

    //let params = new HttpParams();
    //params = params.append('estado', estado);

    return this.http.get<CargarEmpleado>( url, this.usuarioService.headers)
      .pipe(
        map( resp => {
          const empleados = resp.empleados.map( 
            empleado => new Empleado(empleado._id, empleado.documento, empleado.tipoDocumento, 
              empleado.genero, empleado.nombres, empleado.apellidos, empleado.nombApellConca, empleado.tipoEmpleado, empleado.fechaNac, 
              empleado.direccion, empleado.emailCorporativo, empleado.telCelular, 
              empleado.rh, empleado.nomContEmer, empleado.telContEmer, empleado.fechaIngreso, 
              empleado.estado, empleado.numHijos, empleado.fechaCreacionApp, empleado.nacionalidad, 
              empleado.ciudadResidencia,  empleado.epsSalud, empleado.arlTrabajo, empleado.usuarioCreacion, '', empleado.entidadBanco, 
              empleado.numCuentaBanco, empleado.fechaInactivacion, empleado.img)
          );
          return {
            empleados
          };
        })
      )
      //,params
  }
}