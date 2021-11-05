import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MonitorWC } from '../models/monitorwc.model';
import { UsuarioService } from './usuario.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileObtainPdfService {

  public auth2: any;

  constructor( private http: HttpClient, 
               private router: Router,
               public usuarioService: UsuarioService) { }

  /**
   * 
   * @param formData 
   * @returns 
   */
   obtenerArchivoPDF( idRetiro:String, nameFilePDF: String, tipoFolderPDF: String) {
    console.log('Invocacion a FileObtainPDFService(Front) - obtenerArchivoPDF');
    
    const url = `${ base_url }/files/uploadspdf/obtenerpdf/${tipoFolderPDF}/${nameFilePDF}`;

    return this.http.get( url, this.usuarioService.headers ).pipe(map( (resp: any) => resp));
  }
}
