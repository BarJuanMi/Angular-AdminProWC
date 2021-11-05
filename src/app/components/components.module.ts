import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { GraficadonaComponent } from './graficadona/graficadona.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { ModalPdfComponent } from './modal-pdf/modal-pdf.component';
import { ModalImagenLargeComponent } from './modal-imagen-large/modal-imagen-large.component'; 


@NgModule({
  declarations: [IncrementadorComponent, GraficadonaComponent, ModalImagenLargeComponent, ModalImagenComponent, ModalPdfComponent, ],
  exports: [
    IncrementadorComponent,
    GraficadonaComponent,
    ModalImagenLargeComponent,
    ModalImagenComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
