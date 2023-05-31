import { Injectable } from '@angular/core';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CargarPais } from '../interfaces/cargar-paises.interface';
import { Pais } from '../models/pais.util.model';
import { CargarCiudad } from '../interfaces/cargar-ciudades.interface';
import { Ciudad } from '../models/ciudad.util.model';
import { CargarCargoAspirante } from '../interfaces/cargar-cargoaspirante.interface';
import { CargoAspirante } from '../models/cargoaspirante.model';
import { Localidad } from '../models/localidad.util.model';
import { CargarLocalidad } from '../interfaces/cargar-localidades.interface';
import { Sede } from '../models/sede.util.model';
import { CargarSede } from '../interfaces/cargar-sedes.interface';
import { TipoPQRS } from '../models/tipopqrs.model';
import { Usuario } from '../models/usuario.model';
import { CargarTipoPQRS } from '../interfaces/cargar-tipopqrs.interface';
import { CargarTipoAusentismo } from '../interfaces/cargar-tipoausentismo.interface';
import { TipoAusentismo } from '../models/tipoausentismo.model';
import { CargarCausalesRetiro } from '../interfaces/cargar-causalesretiro.interfece';
import { CausalRetiro } from '../models/causalesretiro.model';
import { CargarTipoContrato } from '../interfaces/cargar-tipocontrato.interface';
import { TipoContrato } from '../models/tipocontrato.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UtileslistService {

  public pais: Pais;

  constructor(private http: HttpClient, 
              private router: Router) { }

  /**
   * 
   * @returns 
   */
  cargarSedesList() {
    console.log('Invocacion a UtileslistService(Front) - cargarSedesList');
    const url = `${ base_url }/utiles/sedes`;

    return this.http.get<CargarSede>( url )
      .pipe(
        map( resp => {
          const sedes = resp.sedes.map( 
            sede => new Sede(sede._id, sede.nombre, sede.telefonoPrinc, sede.telefonoSec, sede.direccion, sede.ciudad, sede.localidad)
          );
          return {
            sedes
          };
        })
      )
  }

  /**
   * 
   * @returns 
   */
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

  /**
   * 
   * @returns 
   */
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

  /**
   * 
   * @returns 
   */
  cargarCargosAspirantes() {
    console.log('Invocacion a UtileslistService(Front) - cargarCargosAspirantes');
    const url = `${ base_url }/utiles/cargosaspirante`;

    return this.http.get<CargarCargoAspirante>( url)
      .pipe(
        map( resp => {
          const cargosAspirantes = resp.cargosAspirantes.map( 
            cargoAspirante => new CargoAspirante(cargoAspirante._id, cargoAspirante.cargoId, cargoAspirante.cargoDesc)
          );

          return {
            cargosAspirantes
          };
        })
      )
  }

  /**
   * 
   * @returns 
   */
  cargarLocalidadesCiudad() {
    console.log('Invocacion a UtileslistService(Front) - cargarLocalidadesCiudad');
    const url = `${ base_url }/utiles/localidadesciudad`;

    return this.http.get<CargarLocalidad>( url)
      .pipe(
        map( resp => {
          const localidades = resp.localidades.map( 
            localidad => new Localidad(localidad._id, localidad.localidadId, localidad.localidadName)
          );

          return {
            localidades
          };
        })
      )
  }

  /**
   * 
   * @returns 
   */
  cargarTipoPQRSList() {
    console.log('Invocacion a UtileslistService(Front) - cargarTipoPQRSList');
    const url = `${ base_url }/utiles/tipopqrs`;

    return this.http.get<CargarTipoPQRS>( url)
      .pipe(
        map( resp => {

          //console.log(JSON.stringify(resp));

          const tipospqrs = resp.tipospqrs.map( 
            tipopqrs => new TipoPQRS(tipopqrs._id, tipopqrs.tipopqrsId, tipopqrs.tipopqrsDesc, tipopqrs.usuarioAsig)
          );
          
          return {
            tipospqrs
          };
        })
      )
  }

  /**
   * 
   * @returns 
   */
  cargarTipoAusentismos() {
    console.log('Invocacion a UtileslistService(Front) - cargarTipoAusentismos');
    const url = `${ base_url }/utiles/tipoausentismo`;

    return this.http.get<CargarTipoAusentismo>( url)
      .pipe(
        map( resp => {
          const tipoausentismos = resp.tipoausentismos.map( 
            tipoausentismo => new TipoAusentismo(tipoausentismo._id, tipoausentismo.tipoausentismoId, tipoausentismo.tipoausentismoDesc)
          );

          return {
            tipoausentismos
          };
        })
      )
  }

  /**
   * 
   * @returns 
   */
  cargarCausalesRetiro() {
    console.log('Invocacion a UtileslistService(Front) - cargarCausalesRetiro');
    const url = `${ base_url }/utiles/causalesretiro`;

    return this.http.get<CargarCausalesRetiro>( url)
      .pipe(
        map( resp => {
          const causalesretiro = resp.causalesretiro.map( 
            causalretiro => new CausalRetiro(causalretiro._id, causalretiro.causalretiroId, causalretiro.causalretiroDesc)
          );
          return {
            causalesretiro
          };
        })
      )
  }

  /**
   * 
   * @returns 
   */
  cargarTipoContratos() {
    console.log('Invocacion a UtileslistService(Front) - cargarTipoContratos');
    const url = `${ base_url }/utiles/tipocontrato`;

    return this.http.get<CargarTipoContrato>( url)
      .pipe(
        map( resp => {

          const tipocontratos = resp.tipocontratos.map( 
            tipocontrato => new TipoContrato(tipocontrato._id, tipocontrato.tipocontratoId, tipocontrato.tipocontratoDesc)
          );

          return {
            tipocontratos
          };
        })
      )
  }
}
