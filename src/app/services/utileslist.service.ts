import { Injectable } from '@angular/core';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CargarPais } from '../interfaces/cargar-paises.interface';
import { Pais } from '../models/pais.util.model';
import { CargarCiudad } from '../interfaces/cargar-ciudades.interface';
import { Ciudad } from '../models/ciudad.util.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UtileslistService {

  public pais: Pais;

  constructor(private http: HttpClient, 
              private router: Router) { }

  cargarPaisesList() {
    console.log('Invocacion a UtileslistService(Front) - cargarPaisesList');
    const url = `${ base_url }/utiles/paises`;

    return this.http.get<CargarPais>( url )
      .pipe(
        map( resp => {
          const paises = resp.paises.map( 
            pais => new Pais(pais._id, pais.countryId, pais.countryCode, pais.countryName)
          );
          return {
            paises
          };
        })
      )
  }

  cargarCiudadesList() {
    console.log('Invocacion a UtileslistService(Front) - cargarCiudadesList');
    const url = `${ base_url }/utiles/ciudades`;

    return this.http.get<CargarCiudad>( url)
      .pipe(
        map( resp => {
          const ciudades = resp.ciudades.map( 
            ciudad => new Ciudad(ciudad._id, ciudad.ciudadId, ciudad.ciudadName)
          );

          return {
            ciudades
          };
        })
      )
  }

}
