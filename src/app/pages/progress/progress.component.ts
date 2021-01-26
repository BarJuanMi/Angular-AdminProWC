import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent  {
  progreso1: number = 25;
  progreso2: number = 55;

  classBotonProg1: string = 'btn btn-primary';
  classBotonProg2: string = 'btn btn-warning';

  get obtenerProgreso1() {
    return `${ this.progreso1 }%`;
  }

  get obtenerProgreso2() {
    return `${ this.progreso2 }%`;
  }

}
