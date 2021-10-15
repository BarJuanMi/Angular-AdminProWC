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
    public usuarioService: UsuarioService) { }

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
            vacunado => new Vacunado(vacunado._id, vacunado.farmaceutica, vacunado.fechaPriDosis,
              vacunado.fechaSegDosis, vacunado.fechaTerDosis, vacunado.fechaCuarDosis, vacunado.modelo, 
              vacunado.estado, vacunado.estado, vacunado.usuario, vacunado.img)
          );

          return {
            total: resp.total,
            vacunados
          };
        })
      )
  }
}
