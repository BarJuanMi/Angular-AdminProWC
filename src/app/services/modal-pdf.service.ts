import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalPdfService {

  private _ocultarModal: boolean = true;

  public tipo: 'contratos'|'desprendibles'|'incapacidades'|'pazysalvos';
  public id: string;

  public nuevoPDF: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  constructor() { }

  /**
   * Metodo que permite abrir un modal pequeño para cargar el pdf desde la bd
   * @param tipo el nombre de la coleccion con la cual correlaciona el pdf
   * @param id el registro o fila de la coleccion al cual se le asignara el path del pdf
   * @param img el nombre del pdf que tiene en el disco
   */
  abrirModal(
    tipo: 'contratos'|'desprendibles'|'incapacidades'|'pazysalvos',
    id: string,
    ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  
}
