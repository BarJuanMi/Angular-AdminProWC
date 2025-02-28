import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay, tap } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { CertificacionBancaria } from '../models/certbancaria.model';
import { CargarCertBancaria } from '../interfaces/cargar-certbancarias.interface';
import { Contrato } from '../models/contrato.model';

const base_url = environment.base_url;
const path_general_upload_file = environment.base_url;
const url_load_pdf_certbanca = environment.url_load_pdf_certbancario;

@Injectable({
  providedIn: 'root'
})
export class CertbancariasService {
  constructor(private http: HttpClient,
      private router: Router,
      public usuarioService: UsuarioService) { }
  
    /**
     * Metodo que permite cargar todos los certificaciones que se encuentren en la base de datos.
     * @param desde es el filtro desde donde marcara para obtener los certificaciones desde ahi en adelante.
     * @returns Listado de certificaciones.
     */
    cargarCertificacionesBancariasDesde(desde: number = 0) {
      console.log('Invocación a CertbancariasService(Front) - cargarCertificacionesBancariasDesde');
      const url = `${base_url}/certbancarias?desde=${desde}`;
      return this.http.get<CargarCertBancaria>(url, this.usuarioService.headers)
        .pipe(
          delay(500),
          map(resp => {
            const certbancarias = resp.certbancarias.map(
              certificacion => new CertificacionBancaria(certificacion._id, certificacion.numCuentaBanco, certificacion.emisorCuentaBanco, 
                certificacion.empleado, certificacion.emplNomApel, certificacion.usuarioRegistro, certificacion.fechaRegistro, 
                certificacion.tipoCuentaBanco, certificacion.fechaCargoPDF, certificacion.usuarioCargoPDF, certificacion.pathPDF,
                certificacion.estadoCargoPDF, certificacion.rutaCargueCompletaPDF, certificacion.pathPDFNoExt)
            );

            certbancarias.forEach((cert) => {
              if(cert.pathPDF !== undefined) {
                cert.pathPDFNoExt = cert.pathPDF.split(".")[0];
                cert.rutaCargueCompletaPDF = path_general_upload_file + url_load_pdf_certbanca + cert.pathPDFNoExt;  
              }
            })
  
            return {
              total: resp.total,
              certbancarias
            };
          })
        )
    }
  
    /**
     * Metodo que permite cargar un certificacion en especifico buscandolo mediante su id interno
     * @param id numero de representacion del certificacion dentro de la base de datos
     * @returns Objeto de certificacion que fue retornado por la base de datos
     */
    buscarCertificacionPorId(id: String) {
      console.log('Invocacion a CertbancariasService(Front) - buscarCertificacionPorId');
      const url = `${base_url}/certbancarias/buscarRegCertBancariaId/${id}`;
      return this.http.get(url, this.usuarioService.headers).pipe(map((resp: any) => resp.certbancaria));
    }
  
    /**
     * Metodo que permite eliminar un registro de certificacion en la base de datos
     * @param certificacion Objeto con la informacion del certificacion que se va a eliminar
     * @returns Informacion del proceso si fue o no exitoso en la eliminacion
     */
    eliminarCertificacion( certificacion: CertificacionBancaria) {
      console.log('Invocación a CertbancariasService(Front) - eliminarCertificacion');
      return this.http.delete(`${ base_url }/certbancarias/eliminarRegCertBancaria/${ certificacion._id }`, this.usuarioService.headers);
    }
  
    /**
     * Metodo que permite crear un registro de certificacion nuevo en la base de datos
     * @param formData Objeto con la informacion del nuevo certificacion
     * @returns Informacion del proceso si fue o no exitoso en la insercion
     */
    crearNuevaCertificacion( formData: RegisterForm ) {
      console.log('Invocación a CertbancariasService(Front) - crearNuevaCertificacion');
      return this.http.post(`${base_url}/certbancarias/crearRegCertBancaria`, formData, this.usuarioService.headers);
    }
  
    /**
     * Metodo que permite actualizar un registro de certificacion en la base de datos
     * @param certificacion 
     * @param numCuentaBancoNew 
     * @param emisorCuentaBancoNew 
     * @returns Informacion del proceso si fue o no exitoso en la actualizacion
     */
    actualizarCertificacion(certificacion: CertificacionBancaria, numCuentaBancoNew: string, emisorCuentaBancoNew: string) {
      console.log('Invocación a CertbancariasService(Front) - actualizarCertificacion');
      var jsonStruc = {numCuentaBanco: numCuentaBancoNew, emisorCuentaBanco: emisorCuentaBancoNew};
      return this.http.put(`${ base_url }/certbancarias/actualizarRegCertBancaria/${ certificacion._id }`, jsonStruc, this.usuarioService.headers)
      .pipe(tap ( (resp :any) => {
        resp;
        if(resp.status) {
          let formDataAud = {};
          this.http.post(`${base_url}/certbancarias/crearRegCertBancaria`, formDataAud, this.usuarioService.headers);
        }
      }));
    }
  }