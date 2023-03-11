import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilesValidaService {

  constructor() { }

  /**
   * 
   * @param fechaIni 
   * @param fechaFin 
   * @returns 
   */
  validaFechas(fechaIni: Date, fechaFin: Date) {
    return fechaFin < fechaIni ? false: true;
  }
}
