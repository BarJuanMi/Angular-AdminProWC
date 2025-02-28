import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Empleado } from '../models/empleado.model';
import { Aspirante } from '../models/aspirante.model';
import { Ausentismo } from '../models/ausentismo.model';
import { Retiro } from '../models/retiro.model';
import { Memorando } from '../models/memorando.model';
import { Contrato } from '../models/contrato.model';
import { CertificacionBancaria } from '../models/certbancaria.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem( 'token' ) || '';
  }

  get headers() {
    return { 
      headers: {
        'x-token': this.token
      }
    }
  }

  /**
   * Metodo que permite transformar la respuesta del microservicio en un listado de objetos manipulables 
   * para obtener los usuarios que se encuentran en la aplicacion
   * @param resultados Objeto con la respuesta del microservicio, informacion de respuesta y lista adjunta
   * @returns un listado de objetos de tipo Usuario
   */
  transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, user.fechaCreacion, user.estado, '', user.img, user.google, user.role, user.uid)
    );
  }

  /**
   * Metodo que permite transformar la respuesta del microservicio en un listado de objetos manipulables 
   * para obtener los empleados que se encuentran en la aplicacion
   * @param resultados Objeto con la respuesta del microservicio, informacion de respuesta y lista adjunta
   * @returns un listado de objetos de tipo Empleado
   */
  transformarEmpleado(resultados: any[]): Empleado[] {
    return resultados.map(
      empleado => new Empleado(empleado._id, empleado.documento, empleado.tipoDocumento, empleado.genero, empleado.nombres, empleado.apellidos, empleado.nombApellConca, 
        empleado.tipoEmpleado, empleado.fechaNac, empleado.direccion, empleado.emailCorporativo, empleado.telCelular, empleado.rh, empleado.nomContEmer,
        empleado.telContEmer, empleado.fechaIngreso, empleado.estado, empleado.numHijos, empleado.fechaCreacionApp, empleado.nacionalidad, empleado.ciudadResidencia,
        empleado.epsSalud, empleado.arlTrabajo, empleado.usuarioCreacion, empleado.numHuellero, empleado.fechaInactivacion, empleado.img)
    );
  }

  /**
   * Metodo que permite transformar la respuesta del microservicio en un listado de objetos manipulables 
   * para obtener los aspirantes que se encuentran en la aplicacion
   * @param resultados Objeto con la respuesta del microservicio, informacion de respuesta y lista adjunta
   * @returns un listado de objetos de tipo Aspirante
   */
  transformarAspirante(resultados: any[]): Aspirante[] {
    return resultados.map(
      aspirante => new Aspirante(aspirante._id, aspirante.documento, aspirante.tipoDocumento, aspirante.nombres, aspirante.apellidos, aspirante.nombApellAspConcat, aspirante.edad,
                                aspirante.email, aspirante.numCelular, aspirante.usuarioCreacion, aspirante.cargoAspirante, aspirante.estado,
                                aspirante.notasEntrevistador, aspirante.direccion, aspirante.localidad, aspirante.experienciaPrevia, aspirante.fechaRegistro,
                                aspirante.fechaEntrevista, aspirante.pathResultadoPDF, aspirante.estadoResCargoPDF, aspirante.pathHojaVidaPDF, 
                                aspirante.estadoHVCargoPDF)
    );
  }

  /**
   * Metodo que permite transformar la respuesta del microservicio en un listado de objetos manipulables 
   * para obtener los ausentismos que se encuentran en la aplicacion
   * @param resultados Objeto con la respuesta del microservicio, informacion de respuesta y lista adjunta
   * @returns un listado de objetos de tipo Ausentismo
   */
  transformarAusentismo(resultados: any[]): Ausentismo[] {
    return resultados.map(
      ausentismo => new Ausentismo(ausentismo._id, ausentismo.empleado, ausentismo.estado, ausentismo.tipoAusentismo, ausentismo.fechaInicio, ausentismo.fechaFinalizacion, 
                                  ausentismo.emplNomApel, ausentismo.usuarioRegistro, ausentismo.fechaRegistro, ausentismo.obserAprobRecha, ausentismo.fechaAprobRecha, 
                                  ausentismo.usuarioAprobRecha, ausentismo.fechaCargoPDF, ausentismo.usuarioCargoPDF, ausentismo.pathPDF, ausentismo.estadoCargoPDF, 
                                  ausentismo.rutaCargueCompletaPDF, ausentismo.pahtPDFNoExt)
    );
  }

  /**
   * Metodo que permite transformar la respuesta del microservicio en un listado de objetos manipulables 
   * para obtener los retiros que se encuentran en la aplicacion
   * @param resultados Objeto con la respuesta del microservicio, informacion de respuesta y lista adjunta
   * @returns un listado de objetos de tipo Retiro
   */
  transformarRetiro(resultados: any[]): Retiro[] {
    return resultados.map(
      retiro => new Retiro(retiro._id, retiro.empleado, retiro.emplNomApel, retiro.usuarioRegistro, retiro.fechaRenuncia, retiro.fechaRegistro, retiro.estado, 
                          retiro.motivoRetiro, retiro.entrevista, retiro.encuesta, retiro.fechaFirma, retiro.fechaCargoPDF, retiro.usuarioCargoPDF, retiro.pathPDF, 
                          retiro.estadoCargoPDF, retiro.rutaCargueCompletaPDF, retiro.pathPDFNoExt)
    );
  }

  /**
   * Metodo que permite transformar la respuesta del microservicio en un listado de objetos manipulables 
   * para obtener los memorandos que se encuentran en la aplicacion
   * @param resultados Objeto con la respuesta del microservicio, informacion de respuesta y lista adjunta
   * @returns un listado de objetos de tipo Retiro
   */
  transformarMemorando(resultados: any[]): Memorando[] {
    return resultados.map(
      memorando => new Memorando(memorando._id, memorando.empleado, memorando.emplNomApel, memorando.estado,
                                memorando.usuarioRegistro, memorando.fechaRegistro, memorando.descripcion,
                                memorando.normaInfringida, memorando.posiblesConsecuencias, memorando.fechaEvento, 
                                memorando.respuestaDeMemo, memorando.fechaCargoPDF, memorando.usuarioCargoPDF, 
                                memorando.pathPDF, memorando.estadoCargoPDF, memorando.rutaCargueCompletaPDF, memorando.pathPDFNoExt)
    );
  }

  /**
   * Metodo que permite transformar la respuesta del microservicio en un listado de objetos manipulables 
   * para obtener los memorandos que se encuentran en la aplicacion
   * @param resultados Objeto con la respuesta del microservicio, informacion de respuesta y lista adjunta
   * @returns un listado de objetos de tipo Retiro
   */
  transformarContrato(resultados: any[]): Contrato[] {
    return resultados.map(
      contrato => new Contrato(contrato._id, contrato.empleado, contrato.emplNomApel, contrato.estado,
                                contrato.usuarioRegistro, contrato.fechaRegistro, contrato.tipoContrato,
                                contrato.fechaInicioContrato, contrato.fechaFinContrato, contrato.observaciones,
                                contrato.fechaCaargoPDF, contrato.usuarioCargoPDF, contrato.pathPDF, contrato.estadoCargoPDF,
                                contrato.rutaCargueCompletaPDF, contrato.pathPDFNoExt)
    );
  }

  /**
   * Metodo que permite transformar la respuesta del microservicio en un listado de objetos manipulables 
   * para obtener los memorandos que se encuentran en la aplicacion
   * @param resultados Objeto con la respuesta del microservicio, informacion de respuesta y lista adjunta
   * @returns un listado de objetos de tipo Retiro
   */
  transformarCertBancaria(resultados: any[]): CertificacionBancaria[] {
    return resultados.map(
      certificacion => new CertificacionBancaria(certificacion._id, certificacion.numCuentaBanco, certificacion.emisorCuentaBanco, 
                                              certificacion.empleado, certificacion.emplNomApel, certificacion.usuarioRegistro, certificacion.fechaRegistro, 
                                              certificacion.fechaCargoPDF, certificacion.usuarioCargoPDF, certificacion.pathPDF,
                                              certificacion.estadoCargoPDF, certificacion.rutaCargueCompletaPDF, certificacion.pathPDFNoExt)
    );
  }


  /**
   * Metodo que permite buscar por un termino o por una cadena de texto que funciona como un regex
   * @param tipo la coleccion donde va a buscar
   * @param termino la cadena de busqueda
   * @returns Listado de objetos segun el tipo de coleccion
   */
  buscarPorColeccion(tipo: 'usuarios'|'medicos'|'hospitales'|'aspirantes'|'ausentismos'|'retiros'|'memorandos'|'contratos'|'certbancarias', termino: string) {
    //44.208.35.77:3001/api/busqueda/coleccion/tipo/***

    const url = `${ base_url }/busqueda/coleccion/${tipo}/${termino}`;
    
    return this.http.get<any[]>( url , this.headers)
      .pipe(
        map( (resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);
            
            case 'aspirantes':
              return this.transformarAspirante(resp.resultados);

            case 'ausentismos':
              return this.transformarAusentismo(resp.resultados);

            case 'retiros':
              return this.transformarRetiro(resp.resultados);

            case 'memorandos':
              return this.transformarMemorando(resp.resultados);

            case 'contratos':
              return this.transformarContrato(resp.resultados);

            case 'certbancarias':
              return this.transformarCertBancaria(resp.resultados);

            default:
              return[];
          }
        }));
  }

  /**
   * Metodo que permite buscar por un termino o por una cadena de texto que funciona como un regex
   * @param tipo la coleccion donde va a buscar
   * @param subTipo el tipo de la coleccion donde va a buscar
   * @param termino la cadena de busqueda
   * @returns Listado de objetos segun el tipo de coleccion
   */
  buscarTerminoEnEmpleados(tipo: string, subTipo: string, termino: string) {
    //localhost:3001/api/busqueda/coleccion/empleados/modelo/***
    const url = `${ base_url }/busqueda/coleccion/${tipo}/${subTipo}/${termino}`;

    return this.http.get<any[]>( url , this.headers)
      .pipe(
        map( (resp: any) => {
              return this.transformarEmpleado(resp.resultados);
        }));
  }
}
