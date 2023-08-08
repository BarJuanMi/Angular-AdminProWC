import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay, tap } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { Contrato } from '../models/contrato.model';
import { CargarContrato } from '../interfaces/cargar-contratos.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ContratosService {
  constructor(private http: HttpClient,
    private router: Router,
    public usuarioService: UsuarioService) { }

  /**
   * Metodo que permite cargar todos los contratos que se encuentren en la base de datos.
   * @param desde es el filtro desde donde marcara para obtener los contrato desde ahi en adelante.
   * @returns Listado de contratos.
   */
  cargarContratosDesde(desde: number = 0) {
    console.log('Invocación a ContratosService(Front) - cargarContratosDesde');
    //44.208.35.77:3001/api/contratos?desde=25
    const url = `${base_url}/contratos?desde=${desde}`;
    return this.http.get<CargarContrato>(url, this.usuarioService.headers)
      .pipe(
        delay(500),
        map(resp => {
          const contratos = resp.contratos.map(
            contrato => new Contrato(contrato._id, contrato.empleado, contrato.emplNomApel, contrato.estado,
              contrato.usuarioRegistro, contrato.fechaRegistro, contrato.tipoContrato,
              contrato.fechaInicioContrato, contrato.fechaFinContrato, contrato.observaciones,
              contrato.fechaCargoPDF, contrato.usuarioCargoPDF, contrato.pathPDF,
              contrato.estadoCargoPDF, contrato.rutaCargueCompletaPDF, contrato.pathPDFNoExt,
              contrato.fechaCargueDocsZIP, contrato.usuarioCargueDocsZIP, contrato.pathDocsZIP, contrato.estadoCargueDocsZIP, 
              contrato.rutaCargueCompletaZIP, contrato.pathZIPNoExt, contrato.detallesCambioEstado)
          );

          return {
            total: resp.total,
            contratos
          };
        })
      )
  }

  /**
   * Metodo que permite cargar un contrato en especifico buscandolo mediante su id interno
   * @param id numero de representacion del contrato dentro de la base de datos
   * @returns Objeto de contrato que fue retornado por la base de datos
   */
  buscarContratoPorId(id: String) {
    console.log('Invocacion a ContratosService(Front) - buscarContratoPorId');
    const url = `${base_url}/contratos/buscarRegContratoId/${id}`;
    return this.http.get(url, this.usuarioService.headers).pipe(map((resp: any) => resp.contrato));
  }

  /**
   * Metodo que permite eliminar un registro de contrato en la base de datos
   * @param contrato Objeto con la informacion del contrato que se va a eliminar
   * @returns Informacion del proceso si fue o no exitoso en la eliminacion
   */
  eliminarContrato( contrato: Contrato) {
    console.log('Invocación a ContratosService(Front) - eliminarContrato');
    return this.http.delete(`${ base_url }/contratos/eliminarRegContrato/${ contrato._id }`, this.usuarioService.headers);
  }

  /**
   * Metodo que permite crear un registro de contrato nuevo en la base de datos
   * @param formData Objeto con la informacion del nuevo contrato
   * @returns Informacion del proceso si fue o no exitoso en la insercion
   */
  crearNuevoContrato( formData: RegisterForm ) {
    console.log('Invocación a ContratosService(Front) - crearNuevoContrato');
    return this.http.post(`${base_url}/contratos/crearRegContrato`, formData, this.usuarioService.headers);
  }

  /**
   * Metodo que permite crear un registro de contrato nuevo en la base de datos
   * @param formData Objeto con la informacion del nuevo contrato
   * @returns Informacion del proceso si fue o no exitoso en la insercion
   */
  consultaTipoContrato( idTipoContrato: string ) {
    console.log('Invocación a ContratosService(Front) - consultaTipoContrato');
    const url = `${base_url}/contratos/buscarTipoContratoId/${idTipoContrato}`;
    return this.http.get(url, this.usuarioService.headers).pipe(map((resp: any) => resp.tipoContratoRet));
  }

  /**
   * 
   * @param contrato 
   * @param estadoNew 
   * @param detallesNew 
   * @returns 
   */
  actualizarContrato(contrato: Contrato, estadoNew: string, detallesNew: string) {
    console.log('Invocación a ContratosService(Front) - consultaTipoContrato');
    var jsonStruc = {estado: estadoNew, detallesCambioEstado: detallesNew};
    return this.http.put(`${ base_url }/contratos/actualizarRegContrato/${ contrato._id }`, jsonStruc, this.usuarioService.headers)
    .pipe(tap ( (resp :any) => {
      resp;
      if(resp.status) {
        let formDataAud = {};
        this.http.post(`${base_url}/contratos/crearRegAuditoria`, formDataAud, this.usuarioService.headers);
      }
    }));
  }
}
