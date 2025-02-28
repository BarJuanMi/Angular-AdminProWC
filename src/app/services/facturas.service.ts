import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay, tap } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { CargarFactura } from '../interfaces/cargar-facturas.interface';
import { Factura } from '../models/factura.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  constructor(private http: HttpClient,
    private router: Router,
    public usuarioService: UsuarioService) { }

  /**
   * Metodo que permite cargar todos los facturas que se encuentren en la base de datos.
   * @param desde es el filtro desde donde marcara para obtener las facturas desde ahi en adelante.
   * @returns Listado de facturas.
   */
  cargarFacturasDesde(desde: number = 0) {
    console.log('Invocación a FacturasService(Front) - cargarFacturasDesde');
    const url = `${base_url}/facturas?desde=${desde}`;
    return this.http.get<CargarFactura>(url, this.usuarioService.headers)
      .pipe(
        delay(500),
        map(resp => {
          const facturas = resp.facturas.map(
            factura => new Factura(factura._id,factura.fechaFactura,factura.montoFactura,factura.grupoFacturas,factura.tipoCompraFactura,factura.vendedorFactura,factura.usuarioRegistro,
              factura.sede,factura.fechaRegistro,factura.observaciones,factura.retribuible,factura.usuarioRetribuible,factura.fechaCargueDocsZIP,factura.usuarioCargueDocsZIP,
              factura.pathDocsZIP,factura.estadoCargueDocsZIP,factura.rutaCargueCompletaZIP,factura.pathZIPNoExt)
          );
          console.log(JSON.stringify(facturas));
          return {
            total: resp.total,
            facturas
          };
        })
      )
  }

  /**
   * Metodo que permite cargar un factura en especifico buscandolo mediante su id interno
   * @param id numero de representacion del factura dentro de la base de datos
   * @returns Objeto de factura que fue retornado por la base de datos
   */
  buscarFacturaPorId(id: String) {
    console.log('Invocacion a FacturasService(Front) - buscarFacturaPorId');
    const url = `${base_url}/facturas/buscarRegFacturaId/${id}`;
    return this.http.get(url, this.usuarioService.headers).pipe(map((resp: any) => resp.factura));
  }

  /**
   * Metodo que permite eliminar un registro de factura en la base de datos
   * @param factura Objeto con la informacion del factura que se va a eliminar
   * @returns Informacion del proceso si fue o no exitoso en la eliminacion
   */
  eliminarFactura( factura: Factura) {
    console.log('Invocación a FacturasService(Front) - eliminarFactura');
    return this.http.delete(`${ base_url }/facturas/eliminarRegFactura/${ factura._id }`, this.usuarioService.headers);
  }

  /**
   * 
   * @param formData 
   * @returns 
   */
  crearFactura( formData: RegisterForm ) {
    console.log('Invocación a FacturasService(Front) - crearFactura');
    return this.http.post(`${base_url}/facturas/crearRegFactura`, formData, this.usuarioService.headers);
  }
}
