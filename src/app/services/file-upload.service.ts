import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  /**
   * Metodo que permite actualizar o cargar inicialmente la imagen de un registro dentro de una coleccion
   * @param archivo Objeto tipo File con la imagen
   * @param tipo Nombre de la coleccion donde esta el registro
   * @param id identificador del registro sobre el cual se asociara la imagen
   * @returns Objeto con la respuesta e informacion 
   */
  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales'|'empleados'|'vacunados'|'servlavanderia'|'pqrs',
    id: string
  ) {
    try {
      const url = `${ base_url }/files/uploads/${ tipo }/${ id }`;

      const formData = new FormData();
      formData.append('imagen', archivo);

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
