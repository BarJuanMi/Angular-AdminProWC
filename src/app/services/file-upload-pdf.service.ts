import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadPdfService {

  constructor() { }

  /**
   * Metodo que permite actualizar o cargar inicialmente el pdf de un registro dentro de una coleccion
   * @param archivo Objeto tipo File con el pdf
   * @param tipo Nombre de la coleccion donde esta el registro
   * @param id identificador del registro sobre el cual se asociara el pdf
   * @returns Objeto con la respuesta e informacion 
   */
  async actualizarPDF(
    archivo: File,
    tipo: 'contratos'|'desprendibles'|'incapacidades'|'pazysalvos'|'hojasvida'|'respsicologico'|'ausentismos'|'memorandos',
    id: string
  ) {
    try {
      const url = `${ base_url }/files/uploadspdf/${ tipo }/${ id }`;
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

      if ( data.status ) {
        return data.nombreArchivo;
      } else {
        //console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
