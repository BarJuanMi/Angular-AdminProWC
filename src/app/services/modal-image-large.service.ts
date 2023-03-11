import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageLargeService {

  private _ocultarModalLarge: boolean = true;

  public tipo: 'vacunados'|'servlavanderia';
  public id: string;
  public img: string;

  public nuevaImagenLarge: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModalLarge() {
    return this._ocultarModalLarge;
  }

  constructor() { }

  /**
   * Metodo que permite abrir un modal gigante para cargar la imagen desde la bd
   * @param tipo el nombre de la coleccion con la cual correlaciona la imagen
   * @param id el registro o fila de la coleccion al cual se le asignara el path de la imagen
   * @param img el nombre de la imagen que tiene en el disco
   */
  abrirModalLarge(tipo: 'vacunados'|'servlavanderia', 
                  id: string, 
                  img: string = 'no-img') {
    this._ocultarModalLarge = false;
    this.tipo = tipo;
    this.id = id;
      if ( img.includes('https') ) {
        this.img = img;
      } else {
        this.img = `${ base_url }/files/uploads/obtener/${ tipo }/${ img }`;
      }
  }

  /**
   * Cierra el modal
   */
  cerrarModalLarge() {
    this._ocultarModalLarge = true;
  }
}
