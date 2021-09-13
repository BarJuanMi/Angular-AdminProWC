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

  constructor() { }
}
