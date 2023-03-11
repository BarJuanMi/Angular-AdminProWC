import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { CargarPrestamo } from '../interfaces/cargar-prestamos.interface';
import { Prestamo } from '../models/prestamo.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  
  public auth2: any;
  public prestamo: Prestamo;

  constructor( private http: HttpClient, 
               private router: Router,
               public usuarioService: UsuarioService) { }

  /**
   * 
   * @param desde 
   * @returns 
   */
   cargarPrestamosDesde( desde: number = 0) {
    console.log('Invocación a PrestamosService(Front) - cargarPrestamosDesde');
    //44.208.35.77:3001/api/prestamos?desde=5
    const url = `${ base_url }/prestamos?desde=${ desde }`;
    return this.http.get<CargarPrestamo>( url , this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const prestamos = resp.prestamos.map( 
            prestamo => new Prestamo(prestamo._id, prestamo.monto, 
              prestamo.empleado, prestamo.usuario, 
              prestamo.fechaCreacion, prestamo.estado, 
              prestamo.observaciones, prestamo.fechaActualizacion, prestamo.usuarioActualizacion)
          );

          return {
            total: resp.total,
            prestamos
          };
        })
      )
  }

  /**
   * 
   * @param id 
   * @returns 
   */
   buscarPrestamoPorId( id: String) {
    console.log('Invocacion a PrestamosService(Front) - buscarPrestamoPorId');
    
    const url = `${ base_url }/prestamos/buscarPrestamoId/${ id }`;
    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp.prestamo));
  }

  /**
   * 
   * @param prestamo 
   * @returns 
   */
   actualizarEstadoPrestamo( prestamo: Prestamo) {
    console.log('Invocación a PrestamosService(Front) - actualizarEstadoPrestamo');
    return this.http.put(`${ base_url }/prestamos/actualizarPrestamo/${ prestamo._id }`, prestamo, this.usuarioService.headers);
  }
  
  /**
   * 
   * @param formData 
   * @returns 
   */
  crearNuevoPrestamo( formData: RegisterForm ) {
    console.log('Invocación a PrestamosService(Front) - crearNuevoPrestamo');
    return this.http.post(`${base_url}/prestamos/crearPrestamo`, formData, this.usuarioService.headers);
  }
  
  /**
   * 
   * @param prestamo 
   */
  eliminarPrestamo(prestamo: Prestamo) {
    console.log('Invocación a PrestamosService(Front) - eliminarPrestamo');
    return this.http.delete(`${base_url}/prestamos/eliminarPrestamo/${prestamo._id}`, this.usuarioService.headers);
  }

}
