import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { GraficadonaComponent } from './graficadona/graficadona.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component'; 


@NgModule({
  declarations: [IncrementadorComponent, GraficadonaComponent, ModalImagenComponent],
  exports: [
    IncrementadorComponent,
    GraficadonaComponent,
    ModalImagenComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
