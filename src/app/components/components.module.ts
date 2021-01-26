import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { GraficadonaComponent } from './graficadona/graficadona.component';
import { ChartsModule } from 'ng2-charts'; 


@NgModule({
  declarations: [IncrementadorComponent, GraficadonaComponent],
  exports: [
    IncrementadorComponent,
    GraficadonaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
