import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageLargeService {

  private _ocultarModalLarge: boolean = true;

  public tipo: 'vacunados';
  public id: string;
  public img: string;

  public nuevaImagenLarge: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModalLarge() {
    return this._ocultarModalLarge;
  }

  abrirModalLarge(tipo: 'vacunados', id: string, img: string = 'no-img') {
    this._ocultarModalLarge = false;
    this.tipo = tipo;
    this.id = id;
      if ( img.includes('https') ) {
        this.img = img;
      } else {
        this.img = `${ base_url }/files/uploads/obtener/${ tipo }/${ img }`;
      }
  }

  cerrarModalLarge() {
    this._ocultarModalLarge = true;
  }

  constructor() { }
}
