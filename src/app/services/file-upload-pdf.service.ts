import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadPdfService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'contratos'|'desprendibles'|'incapacidades'|'pazysalvos',
    id: string
  ) {
    try {
      const url = `${ base_url }/files/uploads/${ tipo }/${ id }`;
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

      console.log(data);

      if ( data.status ) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
