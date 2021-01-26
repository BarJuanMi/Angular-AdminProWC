import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent{

  // Este es el argumento que espera que le llegue desde el componente padre --> (progress.component.html)
  // Dicho valor se identificara con el nombre progreso para ser invocado en el padre (linea 27 entre [])
  @Input() progreso: number = 80;
  @Input() btnClass: string = "btn btn-primary";


  // Resultado de disparar un evento que le llegara al componente padre --> (progress.component.html)
  // Dicho valor se identificara con el nombre valorSalidaPorcentaje para ser recibido en el padre (linea 27 entre ())
  @Output() valorSalidaPorcentaje: EventEmitter<number> = new EventEmitter();

  get obtenerPorcentaje() {
    return `${ this.progreso }%`;
  }

  // Metodo invocado desde el incrementador.component.html cuando se tocan los botones de + y -
  cambiarValor( valor: number ) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalidaPorcentaje.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor <= 0) {
      this.valorSalidaPorcentaje.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalidaPorcentaje.emit(this.progreso);
  }

  // Metodo invocado desde el incrementador.component.html cuando se digitan numeros en la caja del incrementador
  onChange( valorDigitadoCaja: number ) {

    if (valorDigitadoCaja >= 100) {
      this.progreso = 100;
    } else if (valorDigitadoCaja <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valorDigitadoCaja;
    }

    this.valorSalidaPorcentaje.emit(this.progreso);
  }
}
