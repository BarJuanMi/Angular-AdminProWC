import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadZipService {

  constructor() { }

  /**
   * Metodo que permite actualizar o cargar inicialmente el pdf de un registro dentro de una coleccion
   * @param archivo Objeto tipo File con el pdf
   * @param tipo Nombre de la coleccion donde esta el registro
   * @param id identificador del registro sobre el cual se asociara el pdf
   * @returns Objeto con la respuesta e informacion 
   */
  async actualizarZIP(
    archivo: File,
    tipo: 'contratos'|'facturacion'|'facturas',
    id: string
  ) {
    try {
      const url = `${ base_url }/files/uploadszip/${ tipo }/${ id }`;
      console.log(`ruta: ${url}`);
      const formData = new FormData();
      formData.append('archivo', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      //console.log(data);
      let respUpload = {};

      if ( data.status ) {
        /*respUpload = { nameFile: data.nombreArchivo, result: true };
        return respUpload;*/
        return data.nombreArchivo;
        //return true;
      } else {
        //console.log(data.msg);
        /*respUpload = { nameFile: undefined, result: false };*/
        return undefined;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
