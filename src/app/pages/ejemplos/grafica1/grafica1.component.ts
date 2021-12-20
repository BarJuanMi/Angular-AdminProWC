import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

   public labels1: string[] = ['Pan', 'Maiz', 'Leche'];
   public data1 = [
    [20, 45, 70]
  ];
}
