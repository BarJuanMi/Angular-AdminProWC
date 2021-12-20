import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { CargarVacunado } from '../interfaces/cargar-vacunados.interface';
import { UsuarioService } from './usuario.service';
import { Vacunado } from '../models/vacunado.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VacunadosService {
  
  
  constructor( private http: HttpClient, 
    private router: Router,
    public usuarioService: UsuarioService) 
  { }

  /**
   * 
   * @param desde 
   * @returns 
   */
   cargarVacunadosDesde( desde: number = 0) {
    console.log('Invocación a VacunadosService(Front) - cargarVacunadosDesde');
    const url = `${ base_url }/vacunados?desde=${ desde }`;
    return this.http.get<CargarVacunado>( url , this.usuarioService.headers)
      .pipe(
        delay(500), 
        map( resp => {
          const vacunados = resp.vacunados.map( 
            vacunado => new Vacunado(vacunado._id, '', vacunado.farmaceutica, vacunado.fechaPriDosis,
              vacunado.fechaSecDosis, vacunado.fechaTerDosis, vacunado.fechaCuarDosis, vacunado.empleado, 
              vacunado.regulador, vacunado.usuario, false, vacunado.img)
          );

          return {
            total: resp.total,
            vacunados
          };
        })
      )
  }
  
  /**
   * 
   * @param formData 
   * @returns 
   */
  crearPrimerRegVacunado( formData: RegisterForm ) {
    console.log('Invocación a VacunadosService(Front) - crearPrimerRegVacunado');
    return this.http.post(`${base_url}/vacunados/crearRegVacunado`, formData, this.usuarioService.headers);
  }

  /**
   * 
   * @param vacunado 
   * @returns 
   */
    eliminarRegVacunado( vacunado: Vacunado ) {
    console.log('Invocación a VacunadosService(Front) - eliminarRegVacunado');
    return this.http.delete(`${ base_url }/vacunados/eliminarRegVacunado/${ vacunado._id }`, this.usuarioService.headers);
  }
  
  /**
   * 
   * @param arg0 
   * @param arg1 
   */
  crearRegistroDosis(vacunado: Vacunado, fechaDosisIN: string, numDosisIN: string) {
    var jsonStruc = {fechaDosis: fechaDosisIN, numDosis: numDosisIN};
    console.log('Invocación a VacunadosService(Front) - crearRegistroDosis');
    return this.http.put(`${base_url}/vacunados/crearRegDosis/${ vacunado._id }`, jsonStruc, this.usuarioService.headers);
  }
}
