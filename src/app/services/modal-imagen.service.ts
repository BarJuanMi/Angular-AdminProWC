import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;

  public tipo: 'usuarios'|'medicos'|'hospitales'|'empleados'|'pqrs';
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  constructor() { }

  /**
   * Metodo que permite abrir un modal pequeño para cargar la imagen desde la bd
   * @param tipo el nombre de la coleccion con la cual correlaciona la imagen
   * @param id el registro o fila de la coleccion al cual se le asignara el path de la imagen
   * @param img el nombre de la imagen que tiene en el disco
   */
  abrirModal(
    tipo: 'usuarios'|'medicos'|'hospitales'|'empleados'|'pqrs',
    id: string,
    img: string = 'no-img'
    ) {
    this._ocultarModal = false;
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
  cerrarModal() {
    this._ocultarModal = true;
  }
}
